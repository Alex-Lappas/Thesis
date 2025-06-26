export function useTrend() {
  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500'
  }

  return {
    getTrendColor,
  }
}
