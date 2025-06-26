import type { Accident, CitiesData, Database, GreekCity, SingleCityData } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { AccidentSeverity } from '@/types'

const severityMapping: Record<string, AccidentSeverity> = {
  low: AccidentSeverity.Low,
  medium: AccidentSeverity.Medium,
  high: AccidentSeverity.High,
}

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)

  const query = getQuery(event)
  const { startDate, endDate } = query

  if (!startDate || !endDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Start and end date are required',
    })
  }

  try {
    let currentPeriodStart: string | null = null
    let currentPeriodEnd: string | null = null
    let previousPeriodStart: string | null = null
    let previousPeriodEnd: string | null = null
    let daysDifference = 0

    currentPeriodStart = startDate as string
    currentPeriodEnd = endDate as string

    const start = new Date(currentPeriodStart)
    const end = new Date(currentPeriodEnd)
    daysDifference = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    const previousEnd = new Date(start.getTime() - 1)
    const previousStart = new Date(previousEnd.getTime() - (daysDifference * 24 * 60 * 60 * 1000))

    previousPeriodStart = previousStart.toISOString().split('T')[0]
    previousPeriodEnd = previousEnd.toISOString().split('T')[0]

    if (!previousPeriodStart || !previousPeriodEnd || !currentPeriodStart || !currentPeriodEnd) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid date range',
      })
    }

    const [
      { data: currentAccidents, error: currentAccidentsError },
      { data: previousAccidents, error: previousAccidentsError },
      { data: greekCities, error: citiesError },
    ] = await Promise.all([
      client.from('accidents').select('*').gte('date', currentPeriodStart).lte('date', currentPeriodEnd),
      client.from('accidents').select('*').gte('date', previousPeriodStart).lte('date', previousPeriodEnd),
      client.from('greek_cities').select('*'),
    ])

    if (currentAccidentsError || previousAccidentsError || citiesError) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch data',
        data: currentAccidentsError || previousAccidentsError || citiesError,
      })
    }

    const citiesData: CitiesData = []

    const accidentsByCity = currentAccidents?.reduce((acc, accident) => {
      const city = accident.city as GreekCity
      if (!acc[city]) {
        acc[city] = []
      }

      const transformedAccident: Accident = {
        id: accident.id,
        coordinates: {
          lat: accident.lat,
          lng: accident.lng,
        },
        city,
        severity: severityMapping[accident.severity] || AccidentSeverity.Low,
        date: accident.date || new Date().toISOString().split('T')[0],
        description: accident.description,
      }

      acc[city].push(transformedAccident)
      return acc
    }, {} as Record<GreekCity, Accident[]>) || {}

    greekCities?.forEach((cityData) => {
      const city = cityData.name as GreekCity
      const cityAccidents = accidentsByCity[city] || []

      const singleCityData: SingleCityData = {
        city,
        accidents: cityAccidents,
        totalAccidents: cityAccidents.length,
        cityCoordinates: {
          lat: cityData.lat,
          lng: cityData.lng,
        },
      }

      citiesData.push(singleCityData)
    })

    const currentStats = {
      total: currentAccidents?.length || 0,
      low: currentAccidents?.filter(acc => acc.severity === 'low').length || 0,
      medium: currentAccidents?.filter(acc => acc.severity === 'medium').length || 0,
      high: currentAccidents?.filter(acc => acc.severity === 'high').length || 0,
    }

    const previousStats = {
      total: previousAccidents.length,
      low: previousAccidents.filter(acc => acc.severity === 'low').length,
      medium: previousAccidents.filter(acc => acc.severity === 'medium').length,
      high: previousAccidents.filter(acc => acc.severity === 'high').length,
    }

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0)
        return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }

    const statistics = {
      currentPeriod: {
        startDate: currentPeriodStart,
        endDate: currentPeriodEnd,
        days: daysDifference,
        ...currentStats,
      },
      previousPeriod: {
        startDate: previousPeriodStart,
        endDate: previousPeriodEnd,
        days: daysDifference,
        ...previousStats,
      },
      changes: {
        total: calculateChange(currentStats.total, previousStats.total),
        low: calculateChange(currentStats.low, previousStats.low),
        medium: calculateChange(currentStats.medium, previousStats.medium),
        high: calculateChange(currentStats.high, previousStats.high),
      },
    }

    return {
      citiesData,
      statistics,
    }
  }
  catch (error) {
    console.error('Error fetching cities data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
