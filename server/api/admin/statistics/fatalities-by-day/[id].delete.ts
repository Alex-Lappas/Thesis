import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required',
    })
  }

  try {
    const { error } = await supabase
      .from('fatalities_by_day')
      .delete()
      .eq('id', Number(id))

    if (error) {
      throw error
    }

    return { success: true }
  }
  catch (error) {
    console.error('Error deleting fatalities by day statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete fatalities by day statistic',
    })
  }
})
