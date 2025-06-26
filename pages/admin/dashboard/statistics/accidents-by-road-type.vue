<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/accidents-by-road-type', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const accidentsByRoadTypeData = computed(() => data.value || [])
const accidentsByRoadTypeColumns = columns.accidents_by_road_type
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Accidents by Road Type"
          description="Manage accident statistics by road type"
          :data="accidentsByRoadTypeData"
          :columns="accidentsByRoadTypeColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/accidents-by-road-type"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
