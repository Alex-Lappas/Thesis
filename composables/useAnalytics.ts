export function useAnalytics() {
  const route = useRoute()

  const getVisitorId = (): string => {
    const VISITOR_ID_KEY = 'visitor_id'
    let visitorId = localStorage.getItem(VISITOR_ID_KEY)

    if (!visitorId) {
      visitorId = crypto.randomUUID()
      localStorage.setItem(VISITOR_ID_KEY, visitorId)
    }

    return visitorId
  }

  const trackPageView = async (path?: string) => {
    try {
      const visitorId = getVisitorId()
      const currentPath = path || route.fullPath

      if (currentPath.startsWith('/admin') || currentPath.startsWith('/api')) {
        return
      }

      await $fetch('/api/analytics/track', {
        method: 'POST',
        body: {
          path: currentPath,
          visitor_id: visitorId,
        },
      })
    }
    catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  const startTracking = () => {
    if (import.meta.client) {
      nextTick(() => {
        trackPageView()
      })
    }

    watch(() => route.fullPath, (newPath) => {
      if (import.meta.client) {
        trackPageView(newPath)
      }
    })
  }

  const track = (path: string) => {
    return trackPageView(path)
  }

  return {
    trackPageView,
    startTracking,
    track,
    getVisitorId,
  }
}
