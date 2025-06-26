<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/data/accidents', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const accidentsData = computed(() => data.value || [])
const accidentsColumns = columns.accidents
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Accidents"
          description="Manage accident records in the database"
          :data="accidentsData"
          :columns="accidentsColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/data/accidents"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
