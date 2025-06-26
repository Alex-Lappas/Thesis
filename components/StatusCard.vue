<script setup lang="ts">
import type { StatusCard } from '@/types'
import { TrendingDown, TrendingUp } from 'lucide-vue-next'
import { computed } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { Trend } from '@/types'

const props = defineProps<StatusCard>()

const trendIcon = computed(() => props.trend === Trend.Down ? TrendingDown : TrendingUp)
const trendColor = computed(() => props.trend === Trend.Up ? 'text-green-500' : 'text-red-500')
const trendText = computed(() => props.trend === Trend.Down ? 'Decrease' : 'Increase')
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <CardTitle class="text-sm font-medium">
        {{ props.title }}
      </CardTitle>
      <component :is="props.icon" class="size-4" :class="props.iconClass" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        {{ props.value }}
      </div>
      <p class="text-xs text-muted-foreground">
        {{ props.description }}
      </p>
      <div v-if="props.trend" class="flex items-center mt-1">
        <component
          :is="trendIcon"
          class="h-3 w-3 mr-1" :class="[trendColor]"
        />
        <span class="text-xs" :class="[trendColor]">
          {{ trendText }} from previous period
        </span>
      </div>
    </CardContent>
  </Card>
</template>
