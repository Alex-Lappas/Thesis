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
import { Bar } from 'vue-chartjs'

const props = defineProps<{
  data: TotalAccidentsAndFatalities[] | null
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
)

interface TotalAccidentsAndFatalities {
  year: number
  totalAccidents: number
  totalFatalAccidents: number
}

const chartData = computed(() => {
  return {
    labels: props.data?.map(item => item.year.toString()),
    datasets: props.data
      ? [
          {
            label: 'Fatal Accidents',
            backgroundColor: '#FF6384',
            data: props.data?.map(item => item.totalFatalAccidents),
          },
          {
            label: 'Total Accidents',
            backgroundColor: '#36A2EB',
            data: props.data?.map(item => item.totalAccidents),
          },
        ]
      : [],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Total Accidents vs Fatal Accidents per Year',
    },
    legend: {
      display: true,
      position: 'top' as const,
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
