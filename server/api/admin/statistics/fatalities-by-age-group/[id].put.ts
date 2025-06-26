import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.age_group || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, age_group, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('fatalities_by_age_group')
      .update({
        age_group: body.age_group,
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
    console.error('Error updating fatalities by age group statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update fatalities by age group statistic',
    })
  }
})
