import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.road_type || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Road type, value, and year are required',
    })
  }

  // if road_type is not in the Constants, throw an error

  if (!Object.values(Constants.public.Enums.enum_road_type).includes(body.road_type as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Road type ${body.road_type} is not in the enum`,
    })
  }

  try {
    const { data, error } = await supabase
      .from('accidents_by_road_type')
      .insert({
        road_type: body.road_type,
        value: Number(body.value),
        year: Number(body.year),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error creating accidents by road type statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create accidents by road type statistic',
    })
  }
})
