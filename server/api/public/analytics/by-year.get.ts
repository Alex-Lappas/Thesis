import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const query = getQuery(event)
  const year = Number.parseInt(query.year as string)

  if (!year || Number.isNaN(year)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid year parameter is required',
    })
  }

  try {
    const [
      { data: fatalitiesByGender, error: fatalitiesByGenderError },
      { data: accidentsByRoadType, error: accidentsByRoadTypeError },
      { data: accidentsByRegion, error: accidentsByRegionError },
      { data: accidentsBySeverity, error: accidentsBySeverityError },
    ] = await Promise.all([
      client.from('fatalities_by_gender').select('gender,value,year').eq('year', year).order('gender'),
      client.from('accidents_by_road_type').select('road_type,value,year').eq('year', year).order('road_type'),
      client.from('accidents_by_region').select('greek_region,value,year').eq('year', year).order('greek_region'),
      client.from('accidents_by_severity').select('severity,value,year').eq('year', year).order('severity'),
    ])

    if (fatalitiesByGenderError || accidentsByRoadTypeError || accidentsByRegionError || accidentsBySeverityError || !fatalitiesByGender || !accidentsByRoadType || !accidentsByRegion || !accidentsBySeverity) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error fetching year-specific data, please try again later.',
      })
    }

    return {
      year,
      fatalitiesByGender,
      accidentsByRoadType,
      accidentsByRegion,
      accidentsBySeverity,
    }
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching year-specific data, please try again later.',
    })
  }
})
