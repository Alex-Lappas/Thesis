import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)

  try {
    const { data, error } = await supabase
      .from('greek_cities')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error fetching Greek cities:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Greek cities',
    })
  }
})
