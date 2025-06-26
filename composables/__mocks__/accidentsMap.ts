import type { Accident, CitiesData, Coordinates } from '@/types'
import { AccidentSeverity, GreekCity } from '@/types'

export const mockAccidents: Accident[] = [
  {
    id: 'ATH001',
    coordinates: {
      lat: 37.9838,
      lng: 23.7275,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.High,
    date: '2024-01-15',
    description: 'Major intersection collision at Syntagma Square',
  },
  {
    id: 'ATH002',
    coordinates: {
      lat: 37.9755,
      lng: 23.7348,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.Medium,
    date: '2024-01-20',
    description: 'Rear-end collision on Kifisias Avenue',
  },
  {
    id: 'ATH003',
    coordinates: {
      lat: 37.9908,
      lng: 23.7383,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.Low,
    date: '2024-02-01',
    description: 'Minor fender bender near Acropolis Museum',
  },
  {
    id: 'ATH004',
    coordinates: {
      lat: 37.9838,
      lng: 23.7275,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.Medium,
    date: '2024-02-10',
    description: 'Traffic light malfunction incident at Omonia',
  },
  {
    id: 'ATH005',
    coordinates: {
      lat: 37.9755,
      lng: 23.7348,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.High,
    date: '2024-02-15',
    description: 'Multi-vehicle pile-up on National Highway',
  },
  {
    id: 'ATH006',
    coordinates: {
      lat: 37.9680,
      lng: 23.7500,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.Low,
    date: '2024-02-22',
    description: 'Motorcycle skid near Zappeion Gardens',
  },
  {
    id: 'ATH007',
    coordinates: {
      lat: 37.9795,
      lng: 23.7162,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.Medium,
    date: '2024-03-01',
    description: 'Bus collision at Monastiraki Station',
  },
  {
    id: 'ATH008',
    coordinates: {
      lat: 37.9850,
      lng: 23.7300,
    },
    city: GreekCity.Athens,
    severity: AccidentSeverity.High,
    date: '2024-03-05',
    description: 'Head-on collision near Parliament building',
  },

  {
    id: 'THK001',
    coordinates: {
      lat: 40.6401,
      lng: 22.9444,
    },
    city: GreekCity.Thessaloniki,
    severity: AccidentSeverity.Medium,
    date: '2024-01-25',
    description: 'Motorcycle accident at White Tower area',
  },
  {
    id: 'THK002',
    coordinates: {
      lat: 40.6311,
      lng: 22.9539,
    },
    city: GreekCity.Thessaloniki,
    severity: AccidentSeverity.Low,
    date: '2024-02-05',
    description: 'Parking lot incident near port',
  },
  {
    id: 'THK003',
    coordinates: {
      lat: 40.6401,
      lng: 22.9444,
    },
    city: GreekCity.Thessaloniki,
    severity: AccidentSeverity.High,
    date: '2024-02-20',
    description: 'Highway collision on Ring Road',
  },
  {
    id: 'THK004',
    coordinates: {
      lat: 40.6330,
      lng: 22.9500,
    },
    city: GreekCity.Thessaloniki,
    severity: AccidentSeverity.Medium,
    date: '2024-03-10',
    description: 'Tram collision at Aristotelous Square',
  },
  {
    id: 'THK005',
    coordinates: {
      lat: 40.6280,
      lng: 22.9480,
    },
    city: GreekCity.Thessaloniki,
    severity: AccidentSeverity.Low,
    date: '2024-03-15',
    description: 'Bicycle accident in university district',
  },

  {
    id: 'HER001',
    coordinates: {
      lat: 35.3387,
      lng: 25.1442,
    },
    city: GreekCity.Heraklion,
    severity: AccidentSeverity.Low,
    date: '2024-01-30',
    description: 'Tourist area minor incident near Koules Fortress',
  },
  {
    id: 'HER002',
    coordinates: {
      lat: 35.3387,
      lng: 25.1442,
    },
    city: GreekCity.Heraklion,
    severity: AccidentSeverity.Medium,
    date: '2024-02-12',
    description: 'Port area collision during ferry loading',
  },
  {
    id: 'HER003',
    coordinates: {
      lat: 35.3300,
      lng: 25.1350,
    },
    city: GreekCity.Heraklion,
    severity: AccidentSeverity.High,
    date: '2024-03-20',
    description: 'Tourist bus accident near Archaeological Museum',
  },

  {
    id: 'PAT001',
    coordinates: {
      lat: 38.2466,
      lng: 21.7346,
    },
    city: GreekCity.Patras,
    severity: AccidentSeverity.Medium,
    date: '2024-02-08',
    description: 'Ferry terminal parking collision',
  },
  {
    id: 'PAT002',
    coordinates: {
      lat: 38.2500,
      lng: 21.7400,
    },
    city: GreekCity.Patras,
    severity: AccidentSeverity.Low,
    date: '2024-02-18',
    description: 'University campus minor accident',
  },
  {
    id: 'PAT003',
    coordinates: {
      lat: 38.2420,
      lng: 21.7300,
    },
    city: GreekCity.Patras,
    severity: AccidentSeverity.High,
    date: '2024-03-12',
    description: 'Bridge approach collision on Rio-Antirrio',
  },

  {
    id: 'LAR001',
    coordinates: {
      lat: 39.6339,
      lng: 22.4197,
    },
    city: GreekCity.Larissa,
    severity: AccidentSeverity.Medium,
    date: '2024-02-14',
    description: 'Agricultural vehicle collision in city center',
  },
  {
    id: 'LAR002',
    coordinates: {
      lat: 39.6400,
      lng: 22.4250,
    },
    city: GreekCity.Larissa,
    severity: AccidentSeverity.Low,
    date: '2024-03-08',
    description: 'Minor intersection incident near train station',
  },

  {
    id: 'VOL001',
    coordinates: {
      lat: 39.3614,
      lng: 22.9422,
    },
    city: GreekCity.Volos,
    severity: AccidentSeverity.Low,
    date: '2024-02-25',
    description: 'Marina area parking incident',
  },
  {
    id: 'VOL002',
    coordinates: {
      lat: 39.3650,
      lng: 22.9380,
    },
    city: GreekCity.Volos,
    severity: AccidentSeverity.Medium,
    date: '2024-03-18',
    description: 'Industrial zone truck collision',
  },

  {
    id: 'RHO001',
    coordinates: {
      lat: 36.4341,
      lng: 28.2176,
    },
    city: GreekCity.Rhodes,
    severity: AccidentSeverity.Low,
    date: '2024-01-28',
    description: 'Old Town narrow street incident',
  },
  {
    id: 'RHO002',
    coordinates: {
      lat: 36.4400,
      lng: 28.2200,
    },
    city: GreekCity.Rhodes,
    severity: AccidentSeverity.Medium,
    date: '2024-03-02',
    description: 'Airport road tourist bus accident',
  },

  {
    id: 'IOA001',
    coordinates: {
      lat: 39.6650,
      lng: 20.8537,
    },
    city: GreekCity.Ioannina,
    severity: AccidentSeverity.Medium,
    date: '2024-02-20',
    description: 'Lake Pamvotis waterfront collision',
  },
  {
    id: 'IOA002',
    coordinates: {
      lat: 39.6700,
      lng: 20.8600,
    },
    city: GreekCity.Ioannina,
    severity: AccidentSeverity.Low,
    date: '2024-03-14',
    description: 'University district bicycle accident',
  },

  {
    id: 'CHN001',
    coordinates: {
      lat: 35.5136,
      lng: 24.0183,
    },
    city: GreekCity.Chania,
    severity: AccidentSeverity.Medium,
    date: '2024-02-16',
    description: 'Old Town pedestrian accident',
  },
  {
    id: 'CHN002',
    coordinates: {
      lat: 35.5136,
      lng: 24.0183,
    },
    city: GreekCity.Chania,
    severity: AccidentSeverity.Low,
    date: '2024-03-22',
    description: 'Beachfront bus accident',
  },

  {
    id: 'CHL001',
    coordinates: {
      lat: 39.1728,
      lng: 23.5663,
    },
    city: GreekCity.Chalkida,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },

  {
    id: 'ALX001',
    coordinates: {
      lat: 40.8397,
      lng: 25.8711,
    },
    city: GreekCity.Alexandroupoli,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },

  {
    id: 'KAV001',
    coordinates: {
      lat: 40.9411,
      lng: 24.4014,
    },
    city: GreekCity.Kavala,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },

  {
    id: 'KAL001',
    coordinates: {
      lat: 37.0381,
      lng: 22.1122,
    },
    city: GreekCity.Kalamata,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },

  {
    id: 'SER001',
    coordinates: {
      lat: 41.0833,
      lng: 23.55,
    },
    city: GreekCity.Serres,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },

  {
    id: 'COR001',
    coordinates: {
      lat: 39.6139,
      lng: 19.9211,
    },
    city: GreekCity.Corfu,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },

  {
    id: 'MYT001',
    coordinates: {
      lat: 39.1139,
      lng: 26.5792,
    },
    city: GreekCity.Mytilene,
    severity: AccidentSeverity.Medium,
    date: '2024-02-28',
    description: 'City center pedestrian accident',
  },
]

export const mockGreekCitiesCoordinates: Record<GreekCity, Coordinates> = {
  [GreekCity.Athens]: { lat: 37.9838, lng: 23.7275 },
  [GreekCity.Thessaloniki]: { lat: 40.6401, lng: 22.9444 },
  [GreekCity.Heraklion]: { lat: 35.3387, lng: 25.1442 },
  [GreekCity.Patras]: { lat: 38.2466, lng: 21.7346 },
  [GreekCity.Larissa]: { lat: 39.6339, lng: 22.4197 },
  [GreekCity.Volos]: { lat: 39.3614, lng: 22.9422 },
  [GreekCity.Rhodes]: { lat: 36.4341, lng: 28.2176 },
  [GreekCity.Ioannina]: { lat: 39.6650, lng: 20.8537 },
  [GreekCity.Chania]: { lat: 35.5136, lng: 24.0183 },
  [GreekCity.Chalkida]: { lat: 39.1728, lng: 23.5663 },
  [GreekCity.Alexandroupoli]: { lat: 40.8397, lng: 25.8711 },
  [GreekCity.Kavala]: { lat: 40.9411, lng: 24.4014 },
  [GreekCity.Kalamata]: { lat: 37.0381, lng: 22.1122 },
  [GreekCity.Serres]: { lat: 41.0833, lng: 23.55 },
  [GreekCity.Corfu]: { lat: 39.6139, lng: 19.9211 },
  [GreekCity.Mytilene]: { lat: 39.1139, lng: 26.5792 },
}

export const mockCitiesData: CitiesData = Object.values(GreekCity).map(city => ({
  city,
  accidents: mockAccidents.filter(accident => accident.city === city),
  totalAccidents: mockAccidents.filter(accident => accident.city === city).length,
  cityCoordinates: mockGreekCitiesCoordinates[city],
}))
