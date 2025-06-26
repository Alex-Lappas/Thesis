import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)

  try {
    const { data, error } = await supabase
      .from('fatalities_by_gender')
      .select('*')
      .order('year', { ascending: false })

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch fatalities by gender',
    })
  }
})
