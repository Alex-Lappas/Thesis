import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.gender || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Gender, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('fatalities_by_gender')
      .insert({
        gender: body.gender,
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
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create fatalities by gender statistic',
    })
  }
})
