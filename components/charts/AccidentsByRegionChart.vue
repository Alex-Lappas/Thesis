<script setup lang="ts">
import type { Constants } from '@/types'
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

const props = defineProps<{
  data: AccidentByRegion[] | null
  year: number
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
)

interface AccidentByRegion {
  greek_region: (typeof Constants.public.Enums.enum_greek_regions)[number]
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
    labels: props.data.map(item => item.greek_region),
    datasets: [
      {
        label: 'Accidents',
        backgroundColor: '#4BC0C0',
        borderColor: '#4BC0C0',
        data: props.data.map(item => item.value),
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
      text: `Accidents by Region (${props.year})`,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Accidents',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Region',
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
      },
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
