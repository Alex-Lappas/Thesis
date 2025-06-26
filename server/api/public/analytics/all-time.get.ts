import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)

  try {
    const [
      { data: totalAccidents, error: totalAccidentsError },
      { data: totalFatalAccidents, error: totalFatalAccidentsError },
      { data: totalFatalitiesByAge, error: totalFatalitiesByAgeError },
      { data: totalFatalAccidentsByMonth, error: totalFatalAccidentsByMonthError },
      { data: totalFatalAccidentsByDay, error: totalFatalAccidentsByDayError },
    ] = await Promise.all([
      client.from('total_accidents').select('*').order('year', { ascending: true }),
      client.from('accidents_by_severity').select('*').eq('severity', Constants.public.Enums.enum_accident_severity[0]).order('year', { ascending: true }),
      client.from('fatalities_by_age_group').select('year,age_group,value').order('year', { ascending: true }),
      client.from('fatalities_by_month').select('*').order('year', { ascending: true }),
      client.from('fatalities_by_day').select('*').order('year', { ascending: true }),
    ])

    if (totalAccidentsError || totalFatalAccidentsError || totalFatalitiesByAgeError || totalFatalAccidentsByMonthError || totalFatalAccidentsByDayError || !totalAccidents || !totalFatalAccidents || !totalFatalitiesByAge || !totalFatalAccidentsByMonth || !totalFatalAccidentsByDay) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error fetching accidents, please try again later.',
      })
    }

    // combine total Accidents and total Fatal Accidents for each year and return the data
    const combinedTotalAccidentsData = totalAccidents.map((accident) => {
      const fatalAccident = totalFatalAccidents.find(fatal => fatal.year === accident.year)
      return {
        year: accident.year,
        totalAccidents: accident.value,
        totalFatalAccidents: fatalAccident?.value || 0,
      }
    })

    // Get unique years and group age data for each year
    const uniqueYears = [...new Set(totalFatalitiesByAge.map(item => item.year))]
    const combinedTotalFatalitiesByAgeData = uniqueYears.map((year) => {
      const yearData = totalFatalitiesByAge.filter(data => data.year === year)

      return {
        year,
        details: yearData.map(data => ({
          age_group: data.age_group,
          value: data.value,
        })),
      }
    })

    // average the fatalities for each month across all the years of available data
    const averageTotalFatalitiesByMonth = Constants.public.Enums.enum_month.map((month) => {
      const monthData = totalFatalAccidentsByMonth.filter(data => data.month === month)
      const totalValue = monthData.reduce((sum, data) => sum + (data.value || 0), 0)
      const averageValue = monthData.length > 0 ? totalValue / monthData.length : 0

      return {
        month,
        averageFatalities: Math.round(averageValue), // Round to 0 decimal places
        yearCount: monthData.length,
      }
    })

    // average the fatalities for each day across all the years of available data
    const averageTotalFatalitiesByDay = Constants.public.Enums.enum_day_of_week.map((day) => {
      const dayData = totalFatalAccidentsByDay.filter(data => data.day_of_week === day)
      const totalValue = dayData.reduce((sum, data) => sum + (data.value || 0), 0)
      const averageValue = dayData.length > 0 ? totalValue / dayData.length : 0

      return {
        day,
        averageFatalities: Math.round(averageValue), // Round to 0 decimal places
        yearCount: dayData.length,
      }
    })

    return {
      totalAccidents: combinedTotalAccidentsData,
      totalFatalitiesByAge: combinedTotalFatalitiesByAgeData,
      averageFatalitiesByMonth: averageTotalFatalitiesByMonth,
      averageFatalitiesByDay: averageTotalFatalitiesByDay,
    }
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching accidents, please try again later.',
    })
  }
})
