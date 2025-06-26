import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.city || !body?.date || !body?.description || !body?.lat || !body?.lng || !body?.severity) {
    throw createError({
      statusCode: 400,
      statusMessage: 'City, date, description, lat, lng, and severity are required',
    })
  }

  // if city is not in the Constants, throw an error
  if (!Object.values(Constants.public.Enums.greek_city).includes(body.city as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `City ${body.city} is not in the enum`,
    })
  }

  // if severity is not in the Constants, throw an error
  if (!Object.values(Constants.public.Enums.accident_severity).includes(body.severity as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Severity ${body.severity} is not in the enum`,
    })
  }

  const { data, error } = await client
    .from('accidents')
    .insert({
      city: body.city as Database['public']['Enums']['greek_city'],
      date: body.date,
      description: body.description,
      lat: Number(body.lat),
      lng: Number(body.lng),
      severity: body.severity as Database['public']['Enums']['accident_severity'],
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating accident:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create accident',
    })
  }

  return data
})
