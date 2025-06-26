import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)

  try {
    const { data, error } = await supabase
      .from('accidents_by_road_type')
      .select('*')
      .order('year', { ascending: false })

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error fetching accidents by road type statistics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch accidents by road type',
    })
  }
})
