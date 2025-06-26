import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith('/api/admin/')) {
    return
  }

  try {
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Please sign in to access admin resources',
      })
    }

    event.context.user = user
  }
  catch (error) {
    console.error('Admin authentication error:', error)
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed',
    })
  }
})
