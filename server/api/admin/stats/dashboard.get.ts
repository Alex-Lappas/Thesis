import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  try {
    const supabase = serverSupabaseServiceRole<Database>(event)

    const [
      accidentsCount,
      latestAccident,
      safetyArticlesCount,
      latestSafetyArticle,
      totalAccidentsData,
    ] = await Promise.all([
      supabase.from('accidents').select('*', { count: 'exact', head: true }),
      supabase.from('accidents').select('*').order('created_at', { ascending: false }).limit(1),
      supabase.from('safety_articles').select('*', { count: 'exact', head: true }),
      supabase.from('safety_articles').select('*').order('created_at', { ascending: false }).limit(1),
      supabase.from('total_accidents').select('*').order('year', { ascending: false }).limit(1),
    ])

    const stats = {
      totalAccidents: accidentsCount.count || 0,
      totalSafetyArticles: safetyArticlesCount.count || 0,
      totalAccidentsLastYear: totalAccidentsData.data?.[0]?.value || 0,

      recentActivity: [
        {
          type: 'accident_reported',
          description: latestAccident.data?.[0]?.description || 'New accident reported',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          type: 'article_published',
          description: latestSafetyArticle.data?.[0]?.title || 'Safety article published',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ],

      quickStats: {
        lastUpdated: new Date().toISOString(),
        systemStatus: 'operational',
      },
    }

    return {
      data: stats,
      timestamp: new Date().toISOString(),
      requestedBy: user.email,
    }
  }
  catch (error) {
    console.error('Dashboard stats API error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch dashboard statistics',
    })
  }
})
