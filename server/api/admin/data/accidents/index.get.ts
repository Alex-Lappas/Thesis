import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)

  const { data, error } = await client
    .from('accidents')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accidents:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch accidents',
    })
  }

  return data
})
