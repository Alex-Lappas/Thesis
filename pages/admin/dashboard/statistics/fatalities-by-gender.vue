<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/statistics/fatalities-by-gender', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const fatalitiesByGenderData = computed(() => data.value || [])
const fatalitiesByGenderColumns = columns.fatalities_by_gender
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Fatalities by Gender"
          description="Manage fatality statistics by gender"
          :data="fatalitiesByGenderData"
          :columns="fatalitiesByGenderColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/statistics/fatalities-by-gender"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
