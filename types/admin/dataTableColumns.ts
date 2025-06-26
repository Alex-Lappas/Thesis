import type { Database } from '@/types'
import { Constants } from '@/types'

type TableName = keyof Database['public']['Tables']

interface ColumnConfig {
  key: string
  label: string
  editable?: boolean
  type?: 'text' | 'number' | 'date' | 'select'
  options?: readonly string[]
}

const commonColumns = [
  { key: 'id', label: 'ID', editable: false },
]

const columns: Record<TableName, ColumnConfig[]> = {
  accidents: [
    ...commonColumns,
    { key: 'city', label: 'City', editable: true, type: 'select' as const, options: Constants.public.Enums.greek_city },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
    { key: 'date', label: 'Date', editable: true, type: 'date' as const },
    { key: 'description', label: 'Description', editable: true, type: 'text' as const },
    { key: 'lat', label: 'Latitude', editable: true, type: 'number' as const },
    { key: 'lng', label: 'Longitude', editable: true, type: 'number' as const },
    { key: 'severity', label: 'Severity', editable: true, type: 'select' as const, options: Constants.public.Enums.accident_severity },
    { key: 'updated_at', label: 'Updated At', editable: false, type: 'date' as const },
  ],
  accidents_by_region: [
    ...commonColumns,
    { key: 'greek_region', label: 'Greek Region', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_greek_regions },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  accidents_by_road_type: [
    ...commonColumns,
    { key: 'road_type', label: 'Road Type', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_road_type },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  accidents_by_severity: [
    ...commonColumns,
    { key: 'severity', label: 'Severity', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_accident_severity },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  analytics: [
    ...commonColumns,
    { key: 'path', label: 'Path', editable: true, type: 'text' as const },
    { key: 'visitor_id', label: 'Visitor ID', editable: true, type: 'text' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  fatalities_by_age_group: [
    ...commonColumns,
    { key: 'age_group', label: 'Age Group', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_age_group },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  fatalities_by_day: [
    ...commonColumns,
    { key: 'day_of_week', label: 'Day of Week', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_day_of_week },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  fatalities_by_gender: [
    ...commonColumns,
    { key: 'gender', label: 'Gender', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_gender },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  fatalities_by_month: [
    ...commonColumns,
    { key: 'month', label: 'Month', editable: true, type: 'select' as const, options: Constants.public.Enums.enum_month },
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  greek_cities: [
    ...commonColumns,
    { key: 'name', label: 'Name', editable: true, type: 'select' as const, options: Constants.public.Enums.greek_city },
    { key: 'lat', label: 'Latitude', editable: true, type: 'number' as const },
    { key: 'lng', label: 'Longitude', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  safety_articles: [
    ...commonColumns,
    { key: 'title', label: 'Title', editable: true, type: 'text' as const },
    { key: 'description', label: 'Description', editable: true, type: 'text' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
  total_accidents: [
    ...commonColumns,
    { key: 'value', label: 'Value', editable: true, type: 'number' as const },
    { key: 'year', label: 'Year', editable: true, type: 'number' as const },
    { key: 'created_at', label: 'Created At', editable: false, type: 'date' as const },
  ],
}

export { columns }
export type { ColumnConfig, TableName }
