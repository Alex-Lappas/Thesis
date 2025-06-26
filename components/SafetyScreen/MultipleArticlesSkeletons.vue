<script setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="space-y-4">
    <div v-for="i in 6" :key="i" class="rounded-lg p-6 border">
      <Skeleton class="h-6 w-3/4 mb-3" />
      <Skeleton class="h-4 w-1/4" />
    </div>
  </div>
</template>
