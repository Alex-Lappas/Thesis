<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/accidents-by-severity', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const accidentsBySeverityData = computed(() => data.value || [])
const accidentsBySeverityColumns = columns.accidents_by_severity
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Accidents by Severity"
          description="Manage accident statistics by severity level"
          :data="accidentsBySeverityData"
          :columns="accidentsBySeverityColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/accidents-by-severity"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
