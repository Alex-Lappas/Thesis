import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.day_of_week || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Day of week, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('fatalities_by_day')
      .insert({
        day_of_week: body.day_of_week,
        value: body.value ? Number(body.value) : null,
        year: Number(body.year),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error creating fatalities by day statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create fatalities by day statistic',
    })
  }
})
