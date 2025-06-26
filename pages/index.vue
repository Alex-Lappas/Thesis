<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import { getLocalTimeZone, today } from '@internationalized/date'

const end = today(getLocalTimeZone())
const start = end.subtract({ days: 30 })

const range = ref<DateRange>({
  start: start as any,
  end: end as any,
}) as Ref<DateRange>

const { data, pending, error } = await useFetch('/api/public/cities-data', {
  query: computed(() => ({
    startDate: range.value.start?.toString(),
    endDate: range.value.end?.toString(),
  })),
  lazy: true,
  server: false,
})

const statistics = computed(() => data.value?.statistics || null)
const citiesData = computed(() => data.value?.citiesData || [])
</script>

<template>
  <div class="min-h-screen flex flex-col justify-start items-center gap-y-2 bg-background flex-1 pt-12">
    <div class="w-full p-4">
      <FacadesDateRange v-model="range" />
    </div>
    <div class="border-b pb-8 border-border w-full px-4">
      <StatusCardList :statistics="statistics" :loading="pending" />
    </div>
    <div class="w-full p-4">
      <MainScreenMapSkeletonLoader v-if="pending" />
      <div v-else-if="error" class="flex justify-center items-center h-[600px] text-red-500">
        Error loading map data: {{ error }}
      </div>
      <MainScreenMapView v-else-if="citiesData" :cities-data="citiesData" />
    </div>
  </div>
</template>
