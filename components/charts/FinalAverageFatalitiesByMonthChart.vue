<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Constants } from '@/types'

const props = defineProps<{
  data: MonthlyFatalities[] | null
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
)

interface MonthlyFatalities {
  month: (typeof Constants.public.Enums.enum_month)[number]
  averageFatalities: number
  yearCount: number
}

const chartData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return {
      labels: [],
      datasets: [],
    }
  }

  // Create month abbreviations mapping from Constants
  const monthAbbreviations = Constants.public.Enums.enum_month.reduce((acc, month) => {
    acc[month] = month.substring(0, 3)
    return acc
  }, {} as { [key: string]: string })

  // Ensure data is ordered by the enum month order
  const orderedData = Constants.public.Enums.enum_month.map((month) => {
    return props.data?.find(item => item.month === month)
  }).filter(Boolean) as MonthlyFatalities[]

  return {
    labels: orderedData.map(item => monthAbbreviations[item.month]),
    datasets: [
      {
        label: 'Average Fatalities',
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        data: orderedData.map(item => item.averageFatalities),
        borderWidth: 1,
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
      text: 'Average Fatalities by Month',
    },
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        afterLabel(context: any) {
          const dataIndex = context.dataIndex
          const yearCount = props.data?.[dataIndex]?.yearCount
          return `Based on ${yearCount} years of data`
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Average Number of Fatalities',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
