import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)

  try {
    const { data, error } = await supabase
      .from('total_accidents')
      .select('*')
      .order('year', { ascending: false })

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error fetching total accidents statistics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch total accidents',
    })
  }
})
