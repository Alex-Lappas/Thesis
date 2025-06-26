export default defineNuxtPlugin(() => {
  const { startTracking } = useAnalytics()

  startTracking()
})
