<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/fatalities-by-age-group', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const fatalitiesByAgeGroupData = computed(() => data.value || [])
const fatalitiesByAgeGroupColumns = columns.fatalities_by_age_group
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Fatalities by Age Group"
          description="Manage fatality statistics by age group"
          :data="fatalitiesByAgeGroupData"
          :columns="fatalitiesByAgeGroupColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/fatalities-by-age-group"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
