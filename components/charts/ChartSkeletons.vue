<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div v-for="i in 4" :key="i" class="bg-white p-4 rounded-lg shadow">
      <Skeleton class="h-8 w-3/4 mb-4" />
      <Skeleton class="h-[400px] w-full" />
    </div>
  </div>
</template>
