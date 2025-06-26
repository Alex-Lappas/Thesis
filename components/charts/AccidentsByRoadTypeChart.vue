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
  data: AccidentByRoadType[] | null
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

interface AccidentByRoadType {
  road_type: (typeof Constants.public.Enums.enum_road_type)[number]
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
    labels: props.data.map(item => item.road_type),
    datasets: [
      {
        label: 'Accidents',
        backgroundColor: '#FFCE56',
        borderColor: '#FFCE56',
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
      text: `Accidents by Road Type (${props.year})`,
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
        text: 'Road Type',
      },
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
