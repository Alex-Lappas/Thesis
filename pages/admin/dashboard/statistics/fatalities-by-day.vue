<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/fatalities-by-day', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const fatalitiesByDayData = computed(() => data.value || [])
const fatalitiesByDayColumns = columns.fatalities_by_day
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Fatalities by Day"
          description="Manage fatality statistics by day of the week"
          :data="fatalitiesByDayData"
          :columns="fatalitiesByDayColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/fatalities-by-day"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
