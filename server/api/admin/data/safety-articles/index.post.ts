import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event)
  const body = await readBody(event)

  if (!body?.title || !body?.description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and description are required',
    })
  }

  try {
    const { data, error } = await supabase
      .from('safety_articles')
      .insert({
        title: body.title,
        description: body.description,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
  catch (error) {
    console.error('Error creating safety article:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create safety article',
    })
  }
})
