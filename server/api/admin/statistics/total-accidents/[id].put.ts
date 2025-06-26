import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('total_accidents')
      .update({
        value: body.value ? Number(body.value) : undefined,
        year: body.year ? Number(body.year) : undefined,
      })
      .eq('id', Number(id))
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error updating total accidents statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update total accidents statistic',
    })
  }
})
