<script setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div>
    <div class="mb-6">
      <Skeleton class="h-10 w-3/4 mb-4" />
      <Skeleton class="h-4 w-1/4" />
    </div>
    <div class="space-y-4">
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-5/6" />
      <Skeleton class="h-4 w-4/6" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-3/4" />
    </div>
  </div>
</template>
