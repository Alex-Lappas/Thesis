import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.day_of_week || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, day_of_week, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('fatalities_by_day')
      .update({
        day_of_week: body.day_of_week,
        value: body.value ? Number(body.value) : null,
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
    console.error('Error updating fatalities by day statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update fatalities by day statistic',
    })
  }
})
