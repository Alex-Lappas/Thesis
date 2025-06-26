import type { Database } from '@/types'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  try {
    const supabase = serverSupabaseServiceRole<Database>(event)

    const now = new Date()
    const lastMonth = new Date()
    lastMonth.setMonth(now.getMonth() - 1)

    const { data: analyticsData, error } = await supabase
      .from('analytics')
      .select('*')
      .gte('created_at', lastMonth.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch analytics data',
      })
    }

    const totalVisits = analyticsData?.length || 0
    const uniqueVisitors = new Set(analyticsData?.map(record => record.visitor_id)).size

    const pageVisits = analyticsData?.reduce((acc, record) => {
      acc[record.path] = (acc[record.path] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}

    const topPages = Object.entries(pageVisits)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([path, visits]) => ({ path, visits }))

    const dailyStats = analyticsData?.reduce((acc, record) => {
      const date = new Date(record.created_at || '').toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { visits: 0, visitors: new Set() }
      }
      acc[date].visits++
      acc[date].visitors.add(record.visitor_id)
      return acc
    }, {} as Record<string, { visits: number, visitors: Set<string> }>) || {}

    const dailyStatsArray = Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        visits: stats.visits,
        uniqueVisitors: stats.visitors.size,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const stats = {
      totalVisits,
      uniqueVisitors,
      topPages,
      dailyStats: dailyStatsArray,
      period: {
        from: lastMonth.toISOString(),
        to: now.toISOString(),
      },
      averageSessionsPerDay: totalVisits / 30,
      totalPages: Object.keys(pageVisits).length,
    }

    return {
      data: stats,
      timestamp: new Date().toISOString(),
      requestedBy: user.email,
    }
  }
  catch (error) {
    console.error('Analytics API error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch analytics data',
    })
  }
})
