<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="flex justify-center items-center h-[600px] w-full">
    <div class="w-full max-w-4xl p-6 space-y-4">
      <div class="flex justify-between items-center mb-6">
        <Skeleton class="h-8 w-48" />
        <Skeleton class="h-10 w-32" />
      </div>

      <div class="relative">
        <Skeleton class="h-[400px] w-full rounded-lg" />

        <div class="absolute top-4 right-4 space-y-2">
          <Skeleton class="h-10 w-10 rounded-md" />
          <Skeleton class="h-10 w-10 rounded-md" />
          <Skeleton class="h-10 w-10 rounded-md" />
        </div>

        <div class="absolute top-4 left-4">
          <Skeleton class="h-10 w-64 rounded-md" />
        </div>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div class="flex space-x-4">
          <Skeleton class="h-6 w-20" />
          <Skeleton class="h-6 w-24" />
          <Skeleton class="h-6 w-16" />
        </div>
        <Skeleton class="h-6 w-32" />
      </div>
    </div>
  </div>
</template>
