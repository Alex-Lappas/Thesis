<script setup lang="ts">
import type { DateRange } from 'reka-ui'

import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const dateRange = defineModel<DateRange>()

// const value = ref({

//   start: new CalendarDate(2022, 1, 20),
// const value = ref({
//   start: new CalendarDate(2022, 1, 20),
//   end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
// }) as Ref<DateRange>
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !dateRange && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="dateRange?.start">
          <template v-if="dateRange?.end">
            {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }} - {{ df.format(dateRange.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 z-[1000]">
      <RangeCalendar
        v-model="dateRange"
        initial-focus
        :number-of-months="2"
        @update:model-value="(newRange) => dateRange = newRange"
      />
    </PopoverContent>
  </Popover>
</template>
