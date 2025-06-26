import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const name = getRouterParam(event, 'id') // Using 'id' param but it's actually the name
  const body = await readBody(event)

  if (!name || !body?.lat || !body?.lng) {
    throw createError({
      statusCode: 400,
      statusMessage: 'City name, lat, and lng are required',
    })
  }

  // if name is not in the Constants, throw an error
  if (!Object.values(Constants.public.Enums.greek_city).includes(name as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `City name ${name} is not in the enum`,
    })
  }

  const updateData: Database['public']['Tables']['greek_cities']['Update'] = {}

  if (body.lat !== undefined) {
    updateData.lat = Number(body.lat)
  }
  if (body.lng !== undefined) {
    updateData.lng = Number(body.lng)
  }

  if (body.name !== undefined) {
    updateData.name = body.name as Database['public']['Enums']['greek_city']
  }

  try {
    const { data, error } = await supabase
      .from('greek_cities')
      .update(updateData)
      .eq('name', name as Database['public']['Enums']['greek_city'])
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error updating Greek city:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update Greek city',
    })
  }
})
