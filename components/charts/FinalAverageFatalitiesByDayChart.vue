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
  data: DailyFatalities[] | null
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
)

interface DailyFatalities {
  day: (typeof Constants.public.Enums.enum_day_of_week)[number]
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

  // Create day abbreviations mapping from Constants
  const dayAbbreviations = Constants.public.Enums.enum_day_of_week.reduce((acc, day) => {
    acc[day] = day.substring(0, 3)
    return acc
  }, {} as { [key: string]: string })

  // Ensure data is ordered by the enum day order
  const orderedData = Constants.public.Enums.enum_day_of_week.map((day) => {
    return props.data?.find(item => item.day === day)
  }).filter(Boolean) as DailyFatalities[]

  return {
    labels: orderedData.map(item => dayAbbreviations[item.day]),
    datasets: [
      {
        label: 'Average Fatalities',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
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
      text: 'Average Fatalities by Day of Week',
    },
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        afterLabel(context: any) {
          const dataIndex = context.dataIndex
          const yearCount = props.data?.[props.data.findIndex(item =>
            Constants.public.Enums.enum_day_of_week.indexOf(item.day) === dataIndex,
          )]?.yearCount
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
        text: 'Day of Week',
      },
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
