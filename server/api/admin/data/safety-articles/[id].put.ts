import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || !body?.title || !body?.description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID, title, and description are required',
    })
  }

  const updateData: Database['public']['Tables']['safety_articles']['Update'] = {}

  if (body.title !== undefined) {
    updateData.title = body.title
  }
  if (body.description !== undefined) {
    updateData.description = body.description
  }

  try {
    const { data, error } = await supabase
      .from('safety_articles')
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
    console.error('Error updating safety article:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update safety article',
    })
  }
})
