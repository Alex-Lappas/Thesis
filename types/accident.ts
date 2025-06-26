export enum AccidentSeverity {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum GreekCity {
  Athens = 'Athens',
  Thessaloniki = 'Thessaloniki',
  Patras = 'Patras',
  Heraklion = 'Heraklion',
  Larissa = 'Larissa',
  Volos = 'Volos',
  Rhodes = 'Rhodes',
  Ioannina = 'Ioannina',
  Chania = 'Chania',
  Chalkida = 'Chalkida',
  Alexandroupoli = 'Alexandroupoli',
  Kavala = 'Kavala',
  Kalamata = 'Kalamata',
  Serres = 'Serres',
  Corfu = 'Corfu',
  Mytilene = 'Mytilene',
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Accident {
  id: string
  coordinates: Coordinates
  city: GreekCity
  severity: AccidentSeverity
  date: string
  description: string
}

export interface SingleCityData {
  city: GreekCity
  accidents: Accident[]
  totalAccidents: number
  cityCoordinates: Coordinates
}

export type CitiesData = SingleCityData[]

export interface MapViewProps {
  citiesData?: CitiesData[]
}
