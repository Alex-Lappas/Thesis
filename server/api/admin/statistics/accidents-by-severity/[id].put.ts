import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.severity || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, severity, value, and year are required',
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
      .update({
        severity: body.severity,
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
    console.error('Error updating accidents by severity statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update accidents by severity statistic',
    })
  }
})
