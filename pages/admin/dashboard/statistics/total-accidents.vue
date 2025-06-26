<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/total-accidents', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const totalAccidentsData = computed(() => data.value || [])
const totalAccidentsColumns = columns.total_accidents
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Total Accidents"
          description="Manage total accident statistics by year"
          :data="totalAccidentsData"
          :columns="totalAccidentsColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/total-accidents"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
