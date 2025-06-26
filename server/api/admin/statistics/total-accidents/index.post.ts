import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Value and year are required',
    })
  }
  try {
    const { data, error } = await supabase
      .from('total_accidents')
      .insert({
        value: Number(body.value),
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
    console.error('Error creating total accidents statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create total accidents statistic',
    })
  }
})
