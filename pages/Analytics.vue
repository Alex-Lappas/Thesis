<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const { data: allTimeData, pending: allTimeDataPending } = await useFetch('/api/public/analytics/all-time', {
  lazy: true,
  server: false,
})

const selectedYear = ref('2023')
const availableYears = ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']

const { data: yearlyData, pending: yearlyDataPending } = await useFetch('/api/public/analytics/by-year', {
  query: computed(() => ({ year: Number.parseInt(selectedYear.value) })),
  lazy: true,
  server: false,
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-10 text-center">
      Road Accident Analytics
    </h1>

    <chartsChartSkeletons v-if="allTimeDataPending" />

    <!-- All Time Section -->
    <div v-else class="mb-12">
      <h2 class="text-2xl font-bold mb-4">
        Analytics for all years
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsFinalTotalAccidentsAndFatalitiesChart :data="allTimeData?.totalAccidents || null" class="h-[400px]" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsFinalTotalFatalitiesByAgeGroupChart :data="allTimeData?.totalFatalitiesByAge || null" class="h-[500px]" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsFinalAverageFatalitiesByMonthChart :data="allTimeData?.averageFatalitiesByMonth || null" class="h-[500px]" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsFinalAverageFatalitiesByDayChart :data="allTimeData?.averageFatalitiesByDay || null" class="h-[500px]" />
        </div>
      </div>
    </div>

    <!-- Year-Specific Section -->
    <div class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">
          Year-Specific Analytics
        </h2>

        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700">Select Year:</label>
          <Select v-model="selectedYear">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <chartsChartSkeletons v-if="yearlyDataPending" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsFatalitiesByGenderChart :data="yearlyData?.fatalitiesByGender || null" :year="parseInt(selectedYear)" class="h-[400px]" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsAccidentsByRoadTypeChart :data="yearlyData?.accidentsByRoadType || null" :year="parseInt(selectedYear)" class="h-[400px]" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsAccidentsByRegionChart :data="yearlyData?.accidentsByRegion || null" :year="parseInt(selectedYear)" class="h-[400px]" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <chartsAccidentsBySeverityChart :data="yearlyData?.accidentsBySeverity || null" :year="parseInt(selectedYear)" class="h-[400px]" />
        </div>
      </div>
    </div>
  </div>
</template>
