<script setup lang="ts">
import type { Constants } from '@/types'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

const props = defineProps<{
  data: FatalitiesByYear[] | null
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

interface AgeGroupDetail {
  age_group: (typeof Constants.public.Enums.enum_age_group)[number]
  value: number | null
}

interface FatalitiesByYear {
  year: number
  details: AgeGroupDetail[]
}

const chartData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return {
      labels: [],
      datasets: [],
    }
  }

  const years = [...new Set(props.data.map(item => item.year))].sort()

  const allAgeGroups = [...new Set(props.data.flatMap(item => item.details.map(detail => detail.age_group)))]

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#C9CBCF',
  ]

  const datasets = allAgeGroups.map((ageGroup, index) => {
    const data = years.map((year) => {
      const yearData = props.data?.find(item => item.year === year)
      const ageData = yearData?.details.find(detail => detail.age_group === ageGroup)
      return ageData?.value ?? 0
    })

    return {
      label: ageGroup,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      data,
      fill: false,
      tension: 0.1,
    }
  })

  return {
    labels: years.map(year => year.toString()),
    datasets,
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Fatalities by Age Group Over Time',
    },
    legend: {
      display: true,
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Fatalities',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Year',
      },
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
