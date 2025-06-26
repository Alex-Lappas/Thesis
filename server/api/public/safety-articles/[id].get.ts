import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const idNumber = Number(id)

    if (Number.isNaN(idNumber)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Article ID is required',
      })
    }

    const client = serverSupabaseServiceRole<Database>(event)

    const { data, error } = await client
      .from('safety_articles')
      .select('*')
      .eq('id', idNumber)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Article not found',
        })
      }
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch safety article',
        data: error,
      })
    }

    return data
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: error,
    })
  }
})
