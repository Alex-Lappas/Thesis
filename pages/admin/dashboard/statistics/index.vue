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

const statisticsRoutes = [
  {
    title: 'Accidents by Region',
    description: 'Manage accident statistics by Greek region',
    path: '/admin/dashboard/statistics/accidents-by-region',
    icon: '🗺️',
  },
  {
    title: 'Accidents by Road Type',
    description: 'Manage accident statistics by road type',
    path: '/admin/dashboard/statistics/accidents-by-road-type',
    icon: '🛣️',
  },
  {
    title: 'Accidents by Severity',
    description: 'Manage accident statistics by severity level',
    path: '/admin/dashboard/statistics/accidents-by-severity',
    icon: '⚠️',
  },
  {
    title: 'Fatalities by Age Group',
    description: 'Manage fatality statistics by age group',
    path: '/admin/dashboard/statistics/fatalities-by-age-group',
    icon: '👥',
  },
  {
    title: 'Fatalities by Day',
    description: 'Manage fatality statistics by day of the week',
    path: '/admin/dashboard/statistics/fatalities-by-day',
    icon: '📅',
  },
  {
    title: 'Fatalities by Gender',
    description: 'Manage fatality statistics by gender',
    path: '/admin/dashboard/statistics/fatalities-by-gender',
    icon: '👤',
  },
  {
    title: 'Fatalities by Month',
    description: 'Manage fatality statistics by month',
    path: '/admin/dashboard/statistics/fatalities-by-month',
    icon: '📊',
  },
  {
    title: 'Total Accidents',
    description: 'Manage total accident statistics by year',
    path: '/admin/dashboard/statistics/total-accidents',
    icon: '📈',
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
            <CardTitle>Statistics Management</CardTitle>
            <CardDescription>
              Manage all statistical data tables in the system. Click on any table below to view and edit records.
            </CardDescription>
          </CardHeader>
        </Card>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="route in statisticsRoutes"
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
