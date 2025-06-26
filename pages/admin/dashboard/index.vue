<script lang="ts">
</script>

<script setup lang="ts">
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

import { Skeleton } from '@/components/ui/skeleton'

definePageMeta({
  middleware: 'auth',
})

const { user } = useAuth()

const { data: dashboardData, error: dashboardError, pending: dashboardPending } = await useFetch('/api/admin/stats/dashboard', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const { data: analyticsData, error: analyticsError, pending: analyticsPending } = await useFetch('/api/admin/stats/analytics', {
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
})

const isLoading = computed(() => dashboardPending.value || analyticsPending.value)
const error = computed(() => dashboardError.value || analyticsError.value)

const totalAccidents = computed(() => dashboardData.value?.data?.totalAccidents || 0)
const totalArticles = computed(() => dashboardData.value?.data?.totalSafetyArticles || 0)
const totalVisits = computed(() => analyticsData.value?.data?.totalVisits || 0)
const uniqueVisitors = computed(() => analyticsData.value?.data?.uniqueVisitors || 0)
const topPages = computed(() => analyticsData.value?.data?.topPages || [])
const recentActivity = computed(() => dashboardData.value?.data?.recentActivity || [])
const quickStats = computed(() => dashboardData.value?.data?.quickStats || null)
</script>

<template>
  <SidebarProvider>
    <AdminScreenSidebar />
    <SidebarInset>
      <AdminScreenHeaderBreadcrumb />
      <div class="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Welcome back!
            </CardTitle>
            <CardDescription>
              You are logged in as: <span class="font-bold">{{ user?.email }}</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <div v-if="isLoading" class="flex flex-col gap-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card v-for="i in 3" :key="i">
              <CardHeader>
                <div class="space-y-3">
                  <Skeleton class="h-4 w-3/4" />
                  <Skeleton class="h-8 w-1/2" />
                </div>
              </CardHeader>
            </Card>
          </div>
          <Card class="h-[500px]">
            <CardHeader>
              <div class="space-y-4">
                <Skeleton class="h-6 w-1/3" />
                <Skeleton class="h-4 w-1/2" />
                <div class="space-y-3 pt-4">
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 w-5/6" />
                  <Skeleton class="h-4 w-4/6" />
                  <Skeleton class="h-4 w-3/4" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card v-else-if="error" class="border-destructive">
          <CardHeader>
            <CardTitle class="text-destructive">
              Error
            </CardTitle>
            <CardDescription>{{ error }}</CardDescription>
          </CardHeader>
        </Card>

        <div v-else class="flex flex-col gap-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle class="text-sm font-medium">
                  Total Accidents
                </CardTitle>
                <div class="text-2xl font-bold">
                  {{ totalAccidents.toLocaleString() }}
                </div>
                <CardDescription>Records in database</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-sm font-medium">
                  Safety Articles
                </CardTitle>
                <div class="text-2xl font-bold">
                  {{ totalArticles.toLocaleString() }}
                </div>
                <CardDescription>Published articles</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-sm font-medium">
                  Site Visits (Last 30 Days)
                </CardTitle>
                <div class="text-2xl font-bold">
                  {{ totalVisits.toLocaleString() }}
                </div>
                <CardDescription>{{ uniqueVisitors.toLocaleString() }} unique visitors</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card v-if="topPages.length > 0">
            <CardHeader>
              <CardTitle>Most Visited Pages</CardTitle>
              <CardDescription>Top pages from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div
                  v-for="page in topPages.slice(0, 5)"
                  :key="page.path"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary rounded-full" />
                    <span class="text-sm font-medium">{{ page.path }}</span>
                  </div>
                  <span class="text-sm text-muted-foreground">{{ page.visits }} visits</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card v-if="recentActivity">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div
                  v-for="activity in recentActivity"
                  :key="activity.timestamp"
                  class="flex items-center space-x-4 text-sm"
                >
                  <div class="w-2 h-2 bg-primary rounded-full" />
                  <div class="flex-1">
                    <p>{{ activity.description }}</p>
                    <p class="text-muted-foreground text-xs">
                      {{ new Date(activity.timestamp).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card v-if="quickStats">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Last updated: {{ new Date(quickStats?.lastUpdated).toLocaleString() }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full" />
                  <span class="text-sm">{{ quickStats?.systemStatus }}</span>
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ analyticsData?.data?.totalPages || 0 }} pages tracked
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
