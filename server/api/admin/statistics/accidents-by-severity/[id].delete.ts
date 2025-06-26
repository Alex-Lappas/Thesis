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
      .from('accidents_by_severity')
      .delete()
      .eq('id', Number(id))

    if (error) {
      throw error
    }

    return { success: true }
  }
  catch (error) {
    console.error('Error deleting accidents by severity statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete accidents by severity statistic',
    })
  }
})
