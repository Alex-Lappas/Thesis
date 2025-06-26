import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)

  const { data, error } = await client
    .from('accidents_by_region')
    .select('*')
    .order('year', { ascending: false })
    .order('greek_region', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch accidents by region',
    })
  }

  return data
})
