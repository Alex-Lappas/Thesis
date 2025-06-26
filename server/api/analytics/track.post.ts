import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { path, visitor_id } = body

    if (!path || !visitor_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Path and visitor_id are required',
      })
    }

    if (typeof path !== 'string' || !path.startsWith('/')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid path format',
      })
    }

    if (typeof visitor_id !== 'string' || visitor_id.length < 10) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid visitor_id format',
      })
    }

    const supabase = serverSupabaseServiceRole<Database>(event)

    const { data, error } = await supabase
      .from('analytics')
      .insert({
        path,
        visitor_id,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error('Analytics insert error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save analytics data',
      })
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    }
  }
  catch (error) {
    console.error('Analytics tracking error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
