import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const name = getRouterParam(event, 'id') // Using 'id' param but it's actually the name

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'City name is required',
    })
  }

  try {
    const { error } = await supabase
      .from('greek_cities')
      .delete()
      .eq('name', name as Database['public']['Enums']['greek_city'])

    if (error) {
      throw error
    }

    return { success: true }
  }
  catch (error) {
    console.error('Error deleting Greek city:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete Greek city',
    })
  }
})
