<script setup lang="ts">
import type { StatusCard } from '@/types'
import { AlertTriangle, Car } from 'lucide-vue-next'
import { Trend } from '@/types/trend'

interface Props {
  statistics?: {
    currentPeriod: {
      startDate: string | null
      endDate: string | null
      days: number
      total: number
      low: number
      medium: number
      high: number
    }
    previousPeriod: {
      startDate: string | null
      endDate: string | null
      days: number
      total: number
      low: number
      medium: number
      high: number
    }
    changes: {
      total: number
      low: number
      medium: number
      high: number
    }
  } | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  statistics: null,
  loading: false,
})

function formatChange(change: number) {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

function getTrend(change: number): Trend {
  return change >= 0 ? Trend.Up : Trend.Down
}

const statusCards = computed((): StatusCard[] => {
  if (!props.statistics) {
    return [
      {
        title: 'Total Accidents',
        value: '...',
        description: 'Total number of road accidents',
        icon: Car,
        trend: Trend.Neutral,
        iconClass: 'text-muted-foreground',
      },
      {
        title: 'High Severity',
        value: '...',
        description: 'Number of high severity accidents',
        icon: AlertTriangle,
        iconClass: 'text-red-500',
        trend: Trend.Neutral,
      },
      {
        title: 'Medium Severity',
        value: '...',
        description: 'Number of medium severity accidents',
        icon: AlertTriangle,
        iconClass: 'text-amber-500',
        trend: Trend.Neutral,
      },
      {
        title: 'Low Severity',
        value: '...',
        description: 'Number of low severity accidents',
        icon: AlertTriangle,
        iconClass: 'text-green-500',
        trend: Trend.Neutral,
      },
    ]
  }

  const { currentPeriod, changes } = props.statistics

  return [
    {
      title: 'Total Accidents',
      value: currentPeriod.total.toLocaleString(),
      description: `Total accidents in the last ${currentPeriod.days} days`,
      icon: Car,
      trend: getTrend(changes.total),
      trendValue: formatChange(changes.total),
      iconClass: 'text-muted-foreground',
    },
    {
      title: 'High Severity',
      value: currentPeriod.high.toLocaleString(),
      description: `High severity accidents (${changes.high >= 0 ? 'increased' : 'decreased'} vs previous period)`,
      icon: AlertTriangle,
      iconClass: 'text-red-500',
      trend: getTrend(changes.high),
      trendValue: formatChange(changes.high),
    },
    {
      title: 'Medium Severity',
      value: currentPeriod.medium.toLocaleString(),
      description: `Medium severity accidents (${changes.medium >= 0 ? 'increased' : 'decreased'} vs previous period)`,
      icon: AlertTriangle,
      iconClass: 'text-amber-500',
      trend: getTrend(changes.medium),
      trendValue: formatChange(changes.medium),
    },
    {
      title: 'Low Severity',
      value: currentPeriod.low.toLocaleString(),
      description: `Low severity accidents (${changes.low >= 0 ? 'increased' : 'decreased'} vs previous period)`,
      icon: AlertTriangle,
      iconClass: 'text-green-500',
      trend: getTrend(changes.low),
      trendValue: formatChange(changes.low),
    },
  ]
})
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
    <StatusCard
      v-for="card in statusCards"
      :key="card.title"
      v-bind="card"
    />
  </div>
</template>
