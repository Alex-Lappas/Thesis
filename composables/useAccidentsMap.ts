import type { CitiesData, GreekCity, SingleCityData } from '@/types'
import { AccidentSeverity } from '@/types'

export function useAccidents(citiesData: MaybeRefOrGetter<CitiesData>) {
  const CENTER_OF_GREECE_COORDINATES: [number, number] = [38.5, 23.0]

  const selectedCity = ref<SingleCityData | null>(null)
  const mapCenter = ref<[number, number]>(CENTER_OF_GREECE_COORDINATES)
  const mapZoom = ref(6)

  const getSeverityColor: Record<AccidentSeverity, string> = {
    [AccidentSeverity.High]: '#FF0000',
    [AccidentSeverity.Medium]: '#FFA500',
    [AccidentSeverity.Low]: '#008000',
  }

  const getClusterRadius = (totalAccidents: number): number => {
    return Math.min(totalAccidents * 10, 50)
  }

  const onCityClick = (city: GreekCity) => {
    const cityData = toValue(citiesData).find(cityData => cityData.city === city)
    if (cityData) {
      selectedCity.value = cityData
      mapZoom.value = 12
      mapCenter.value = [cityData.cityCoordinates.lat, cityData.cityCoordinates.lng]
    }
  }

  const resetView = () => {
    selectedCity.value = null
    mapCenter.value = CENTER_OF_GREECE_COORDINATES
    mapZoom.value = 6
  }

  watch(mapZoom, (newZoom) => {
    if (newZoom < 8) {
      selectedCity.value = null
    }
  })

  return {
    selectedCity,
    mapCenter,
    mapZoom,
    onCityClick,
    resetView,
    getSeverityColor,
    getClusterRadius,
  }
}
