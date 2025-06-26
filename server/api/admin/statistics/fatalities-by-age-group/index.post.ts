import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.age_group || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Age group, value, and year are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('fatalities_by_age_group')
      .insert({
        age_group: body.age_group,
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
    console.error('Error creating fatalities by age group statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create fatalities by age group statistic',
    })
  }
})
