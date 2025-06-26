import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.road_type || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, road_type, value, and year are required',
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
      .update({
        road_type: body.road_type,
        value: body.value ? Number(body.value) : undefined,
        year: body.year ? Number(body.year) : undefined,
      })
      .eq('id', Number(id))
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error updating accidents by road type statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update accidents by road type statistic',
    })
  }
})
