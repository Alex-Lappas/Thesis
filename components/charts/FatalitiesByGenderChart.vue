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
  data: FatalityByGender[] | null
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

interface FatalityByGender {
  gender: (typeof Constants.public.Enums.enum_gender)[number]
  value: number | null
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
    labels: props.data.map(item => item.gender),
    datasets: [
      {
        label: 'Fatalities',
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#FF6384', '#36A2EB'],
        data: props.data.map(item => item.value ?? 0),
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
      text: `Fatalities by Gender (${props.year})`,
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
        text: 'Number of Fatalities',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Gender',
      },
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
