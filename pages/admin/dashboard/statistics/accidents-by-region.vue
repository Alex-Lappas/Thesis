<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/accidents-by-region', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const accidentsByRegionData = computed(() => data.value || [])
const accidentsByRegionColumns = columns.accidents_by_region
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Accidents by Region"
          description="Manage accident statistics by Greek region"
          :data="accidentsByRegionData"
          :columns="accidentsByRegionColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/accidents-by-region"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
