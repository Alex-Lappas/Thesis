<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/fatalities-by-month', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const fatalitiesByMonthData = computed(() => data.value || [])
const fatalitiesByMonthColumns = columns.fatalities_by_month
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Fatalities by Month"
          description="Manage fatality statistics by month"
          :data="fatalitiesByMonthData"
          :columns="fatalitiesByMonthColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/fatalities-by-month"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
