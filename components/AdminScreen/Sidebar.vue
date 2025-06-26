<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { LogOut, ShieldUser, User } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import { adminNavigationRoutes } from '~/configs/adminNavigation'

const props = defineProps<SidebarProps>()

const routes = adminNavigationRoutes

const { isPathActive } = useAdminActivePaths()
const { logout, userEmail } = useAuth()

const isLoggingOut = ref(false)

async function handleLogout() {
  isLoggingOut.value = true
  try {
    await logout()
  }
  catch (error) {
    console.error('Logout error:', error)
  }
  finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/admin/dashboard">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <ShieldUser class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Greece Road Accidents</span>
                <span class="text-xs text-sidebar-muted-foreground">Admin Panel</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in routes" :key="item.title">
            <SidebarMenuButton as-child :is-active="isPathActive(item.path)">
              <NuxtLink :to="item.path">
                {{ item.title }}
              </NuxtLink>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.subItems && item.subItems.length">
              <SidebarMenuSubItem v-for="childItem in item.subItems" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="isPathActive(childItem.path)">
                  <NuxtLink :to="childItem.path">
                    {{ childItem.title }}
                  </NuxtLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <div class="px-2 py-1.5">
            <div class="flex items-center gap-2 text-sm">
              <User class="size-4" />
              <span class="truncate">{{ userEmail }}</span>
            </div>
          </div>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Button
            variant="ghost"
            size="sm"
            class="w-full justify-start gap-2"
            :disabled="isLoggingOut"
            @click="handleLogout"
          >
            <LogOut class="size-4" />
            <span v-if="isLoggingOut">Signing out...</span>
            <span v-else>Sign out</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
