<script setup lang="ts">
import type { Constants } from '@/types'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from 'chart.js'
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'

const props = defineProps<{
  data: AccidentBySeverity[] | null
  year: number
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

interface AccidentBySeverity {
  severity: (typeof Constants.public.Enums.enum_accident_severity)[number]
  value: number
  year: number
}

const chartData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return {
      labels: [],
      datasets: [],
    }
  }

  return {
    labels: props.data.map(item => item.severity),
    datasets: [
      {
        label: 'Accidents',
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#FF6384', '#36A2EB'],
        data: props.data.map(item => item.value),
        borderWidth: 2,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: `Accidents by Severity (${props.year})`,
    },
    legend: {
      display: true,
      position: 'bottom' as const,
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          const total = context.dataset.data.reduce((sum: number, value: number) => sum + value, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return `${context.label}: ${context.parsed} (${percentage}%)`
        },
      },
    },
  },
  cutout: '50%',
}
</script>

<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
