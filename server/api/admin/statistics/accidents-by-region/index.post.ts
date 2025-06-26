import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default eventHandler(async (event) => {
  const client = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.greek_region || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Greek region, value, and year are required',
    })
  }

  // if greek_region is not in the Constants, throw an error
  if (!Object.values(Constants.public.Enums.enum_greek_regions).includes(body.greek_region as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Greek region ${body.greek_region} is not in the enum`,
    })
  }

  const { data, error } = await client
    .from('accidents_by_region')
    .insert({
      greek_region: body.greek_region as Database['public']['Enums']['enum_greek_regions'],
      value: Number(body.value),
      year: Number(body.year),
    })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create accidents by region record',
    })
  }

  return data
})
