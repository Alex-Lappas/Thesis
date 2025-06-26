import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'
import { Constants } from '@/types'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.greek_region || !body?.value || !body?.year) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, greek_region, value, and year are required',
    })
  }

  // if greek_region is not in the Constants, throw an error

  if (!Object.values(Constants.public.Enums.enum_greek_regions).includes(body.greek_region as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Greek region ${body.greek_region} is not in the enum`,
    })
  }

  const updateData: Database['public']['Tables']['accidents_by_region']['Update'] = {}

  if (body.greek_region !== undefined) {
    updateData.greek_region = body.greek_region as Database['public']['Enums']['enum_greek_regions']
  }

  if (body.value !== undefined) {
    updateData.value = Number(body.value)
  }
  if (body.year !== undefined) {
    updateData.year = Number(body.year)
  }

  try {
    const { data, error } = await supabase
      .from('accidents_by_region')
      .update(updateData)
      .eq('id', Number(id))
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error updating accidents by region statistic:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update accidents by region statistic',
    })
  }
})
