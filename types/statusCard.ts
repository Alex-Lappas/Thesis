import type { Component } from 'vue'
import type { Trend } from '@/types'

export interface StatusCard {
  title: string
  value: string
  description: string
  icon: Component
  iconClass?: string
  trend?: Trend
  trendValue?: string
}
