import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.month || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Month, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('fatalities_by_month')
      .insert({
        month: body.month,
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
    console.error('Error creating fatalities by month statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create fatalities by month statistic',
    })
  }
})
