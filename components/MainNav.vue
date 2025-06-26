<script setup>
import { BarChart3, Home, MapPin, Menu, ShieldAlert, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'

const route = useRoute()
const isOpen = ref(false)

const navItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    href: '/safety',
    label: 'Safety Measures',
    icon: ShieldAlert,
  },
]
</script>

<template>
  <nav class="relative flex items-center justify-between px-4 py-2 border-b border-border">
    <!-- Title and Logo -->
    <NuxtLink to="/">
      <div class="flex items-center gap-2">
        <MapPin class="h-6 w-6 text-destructive" />
        <span class="text-lg font-semibold inline-block">Greece Road Accidents</span>
      </div>
    </NuxtLink>
    <!-- Mobile menu button -->
    <Button
      variant="ghost"
      size="icon"
      class="md:hidden"
      @click="isOpen = !isOpen"
    >
      <Menu v-if="!isOpen" class="h-5 w-5" />
      <X v-else class="h-5 w-5" />
    </Button>

    <!-- Desktop menu -->
    <div class="hidden md:flex items-center space-x-4 lg:space-x-6">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
      >
        <Button
          variant="ghost"
          class="text-sm font-medium transition-colors hover:text-primary w-fit" :class="[
            route.path === item.href ? 'text-primary' : 'text-muted-foreground',
          ]"
        >
          <component :is="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </Button>
      </NuxtLink>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="isOpen"
      class="absolute top-full left-0 w-full bg-background border-b md:hidden"
    >
      <div class="flex flex-col py-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
        >
          <Button
            variant="ghost"
            class="justify-start px-4 py-2 text-sm font-medium transition-colors hover:text-primary" :class="[
              route.path === item.href ? 'text-primary' : 'text-muted-foreground',
            ]"
            @click="isOpen = false"
          >
            <component :is="item.icon" class="h-4 w-4 mr-2" />
            {{ item.label }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
