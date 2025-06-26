import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required',
    })
  }

  const { error } = await client
    .from('accidents')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting accident:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete accident',
    })
  }

  return { success: true }
})
