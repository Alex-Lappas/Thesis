<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  SidebarTrigger,
} from '@/components/ui/sidebar/'

const { isPathActive, activePaths } = useAdminActivePaths()
</script>

<template>
  <header class="flex min-h-16 shrink-0 items-center gap-2 border-b">
    <div class="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(item, index) in activePaths" :key="index">
            <BreadcrumbItem>
              <BreadcrumbLink v-if="!isPathActive(item.path)" as-child>
                <NuxtLink :to="item.path">
                  {{ item.title }}
                </NuxtLink>
              </BreadcrumbLink>
              <BreadcrumbPage v-else>
                {{ item.title }}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="index < activePaths.length - 1" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>
