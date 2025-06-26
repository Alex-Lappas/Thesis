<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar/'

definePageMeta({
  middleware: 'auth',
})

const dataRoutes = [
  {
    title: 'Accidents',
    description: 'Manage accident records in the database',
    path: '/admin/dashboard/data/accidents',
    icon: '🚗',
  },
  {
    title: 'Safety Articles',
    description: 'Manage safety articles in the database',
    path: '/admin/dashboard/data/safety-articles',
    icon: '📰',
  },
  {
    title: 'Greek Cities',
    description: 'Manage Greek cities data in the database',
    path: '/admin/dashboard/data/greek-cities',
    icon: '🏙️',
  },
]
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Manage all data tables in the system. Click on any table below to view and edit records.
            </CardDescription>
          </CardHeader>
        </Card>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="route in dataRoutes"
            :key="route.path"
            class="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ route.icon }}</span>
                <div>
                  <CardTitle class="text-lg">
                    {{ route.title }}
                  </CardTitle>
                  <CardDescription class="text-sm">
                    {{ route.description }}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <NuxtLink :to="route.path">
                <Button class="w-full">
                  Manage {{ route.title }}
                </Button>
              </NuxtLink>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
