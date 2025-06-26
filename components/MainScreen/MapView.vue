<script setup lang="ts">
import type { CitiesData } from '@/types'
import { useAccidents } from '@/composables/useAccidentsMap'

const props = defineProps<{
  citiesData: CitiesData
}>()

const {
  selectedCity,
  mapCenter,
  mapZoom,
  onCityClick,
  resetView,
  getSeverityColor,
  getClusterRadius,
} = useAccidents(props.citiesData)
</script>

<template>
  <div class="w-full h-[600px] relative">
    <!-- Map Controls -->
    <div class="absolute top-2 left-12 z-[2] bg-card p-3 rounded-lg shadow-lg">
      <h3 class="font-semibold text-sm mb-2">
        Greece Accident Map
      </h3>
      <div class="space-y-1 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-red-500 rounded-full" />
          <span>High Severity</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-amber-500 rounded-full" />
          <span>Medium Severity</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-500 rounded-full" />
          <span>Low Severity</span>
        </div>
      </div>
      <button
        v-if="selectedCity"
        class="mt-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/80"
        @click="resetView"
      >
        Reset View
      </button>
    </div>

    <!-- Selected City Info Panel -->
    <div
      v-if="selectedCity"
      class="hidden absolute sm:block top-4 right-4 z-[2] bg-card p-4 rounded-lg shadow-lg max-w-xs"
    >
      <h4 class="font-semibold text-lg mb-2">
        {{ selectedCity.city }}
      </h4>
      <p class="text-sm text-gray-600 mb-3">
        Total Accidents: <span class="font-medium">{{ selectedCity.totalAccidents }}</span>
      </p>

      <div class="space-y-2 max-h-40 overflow-y-auto">
        <div
          v-for="accident in selectedCity.accidents"
          :key="accident.id"
          class="p-2 border rounded text-xs"
        >
          <div class="flex items-center gap-2 mb-1">
            <div
              class="w-2 h-2 rounded-full"
              :style="{ backgroundColor: getSeverityColor[accident.severity] }"
            />
            <span class="font-medium">{{ accident.severity.toUpperCase() }}</span>
            <span class="text-gray-500">{{ new Date(accident.date).toLocaleDateString() }}</span>
          </div>
          <p class="text-gray-700">
            {{ accident.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Leaflet Map -->
    <LMap
      v-model:zoom="mapZoom"
      v-model:center="mapCenter"
      :use-global-leaflet="false"
      class="w-full h-full rounded-lg"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      <!-- City Clusters (when zoomed out) -->
      <template v-if="mapZoom <= 8">
        <LCircleMarker
          v-for="city in citiesData"
          :key="city.city"
          :lat-lng="[city.cityCoordinates.lat, city.cityCoordinates.lng]"
          :radius="getClusterRadius(city.totalAccidents)"
          color="#3b82f6"
          fill-color="#3b82f6"
          :fill-opacity="0.6"
          :weight="2"
          class="cursor-pointer"
        >
          <LPopup>
            <div class="text-center">
              <h4 class="font-semibold">
                {{ city.city }}
              </h4>
              <p class="text-sm">
                {{ city.totalAccidents }} accidents
              </p>
              <button
                class="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                @click="onCityClick(city.city)"
              >
                View Details
              </button>
            </div>
          </LPopup>
        </LCircleMarker>
      </template>

      <!-- Individual Accidents (when zoomed in) -->
      <template v-if="mapZoom > 8 && selectedCity">
        <LCircleMarker
          v-for="accident in selectedCity.accidents"
          :key="accident.id"
          :lat-lng="[accident.coordinates.lat, accident.coordinates.lng]"
          :radius="8"
          :color="getSeverityColor[accident.severity]"
          :fill-color="getSeverityColor[accident.severity]"
          :fill-opacity="0.8"
          :weight="2"
        >
          <LPopup>
            <div>
              <h5 class="font-semibold text-sm">
                {{ accident.city }} Accident
              </h5>
              <p class="text-xs text-gray-600 mb-1">
                {{ new Date(accident.date).toLocaleDateString() }}
              </p>
              <p class="text-sm mb-2">
                {{ accident.description }}
              </p>
              <div class="flex items-center gap-2">
                <div
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: getSeverityColor[accident.severity] }"
                />
                <span class="text-xs font-medium">{{ accident.severity.toUpperCase() }} SEVERITY</span>
              </div>
            </div>
          </LPopup>
        </LCircleMarker>
      </template>
    </LMap>
  </div>
</template>

<style scoped>
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>
