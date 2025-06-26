import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.severity || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Severity, value, and year are required',
    })
  }

  // if severity is not in the Constants, throw an error

  if (!Object.values(Constants.public.Enums.enum_accident_severity).includes(body.severity as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Severity ${body.severity} is not in the enum`,
    })
  }
  try {
    const { data, error } = await supabase
      .from('accidents_by_severity')
      .insert({
        severity: body.severity,
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
    console.error('Error creating accidents by severity statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create accidents by severity statistic',
    })
  }
})
