import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.city || !body?.date || !body?.description || !body?.lat || !body?.lng || !body?.severity) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, city, date, description, lat, lng, and severity are required',
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

  const updateData: Database['public']['Tables']['accidents']['Update'] = {}

  if (body.city !== undefined) {
    updateData.city = body.city as Database['public']['Enums']['greek_city']
  }
  if (body.date !== undefined) {
    updateData.date = body.date
  }
  if (body.description !== undefined) {
    updateData.description = body.description
  }
  if (body.lat !== undefined) {
    updateData.lat = Number(body.lat)
  }
  if (body.lng !== undefined) {
    updateData.lng = Number(body.lng)
  }
  if (body.severity !== undefined) {
    updateData.severity = body.severity as Database['public']['Enums']['accident_severity']
  }

  const { data, error } = await client
    .from('accidents')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating accident:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update accident',
    })
  }

  return data
})
