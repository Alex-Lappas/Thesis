import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.name || !body?.lat || !body?.lng) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, lat, and lng are required',
    })
  }

  if (!Object.values(Constants.public.Enums.greek_city).includes(body.name as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `City name ${body.name} is not in the enum`,
    })
  }

  try {
    const { data, error } = await supabase
      .from('greek_cities')
      .insert({
        name: body.name as Database['public']['Enums']['greek_city'],
        lat: Number(body.lat),
        lng: Number(body.lng),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error creating Greek city:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create Greek city',
    })
  }
})
