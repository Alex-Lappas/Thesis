<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/data/greek-cities', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const greekCitiesData = computed(() => data.value || [])
const greekCitiesColumns = columns.greek_cities
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Greek Cities"
          description="Manage Greek cities data in the database"
          :data="greekCitiesData"
          :columns="greekCitiesColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/data/greek-cities"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
