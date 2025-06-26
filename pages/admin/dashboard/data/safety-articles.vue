<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'
import { columns } from '@/types/admin/dataTableColumns'

definePageMeta({
  middleware: 'auth',
})

const { data, error, pending, refresh } = await useFetch('/api/admin/data/safety-articles', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const safetyArticlesData = computed(() => data.value || [])
const safetyArticlesColumns = columns.safety_articles
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <AdminDataTable
          title="Safety Articles"
          description="Manage safety articles in the database"
          :data="safetyArticlesData"
          :columns="safetyArticlesColumns"
          :loading="pending"
          :error="error?.message"
          api-endpoint="/api/admin/data/safety-articles"
          @refresh="refresh"
        />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
