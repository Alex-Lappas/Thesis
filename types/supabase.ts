export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accidents: {
        Row: {
          city: Database['public']['Enums']['greek_city']
          created_at: string
          date: string
          description: string
          id: string
          lat: number
          lng: number
          severity: Database['public']['Enums']['accident_severity']
          updated_at: string
        }
        Insert: {
          city: Database['public']['Enums']['greek_city']
          created_at?: string
          date?: string
          description: string
          id?: string
          lat: number
          lng: number
          severity: Database['public']['Enums']['accident_severity']
          updated_at?: string
        }
        Update: {
          city?: Database['public']['Enums']['greek_city']
          created_at?: string
          date?: string
          description?: string
          id?: string
          lat?: number
          lng?: number
          severity?: Database['public']['Enums']['accident_severity']
          updated_at?: string
        }
        Relationships: []
      }
      accidents_by_region: {
        Row: {
          created_at: string | null
          greek_region: Database['public']['Enums']['enum_greek_regions']
          id: number
          value: number
          year: number
        }
        Insert: {
          created_at?: string | null
          greek_region: Database['public']['Enums']['enum_greek_regions']
          id?: number
          value: number
          year: number
        }
        Update: {
          created_at?: string | null
          greek_region?: Database['public']['Enums']['enum_greek_regions']
          id?: number
          value?: number
          year?: number
        }
        Relationships: []
      }
      accidents_by_road_type: {
        Row: {
          created_at: string | null
          id: number
          road_type: Database['public']['Enums']['enum_road_type']
          value: number
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          road_type: Database['public']['Enums']['enum_road_type']
          value: number
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          road_type?: Database['public']['Enums']['enum_road_type']
          value?: number
          year?: number
        }
        Relationships: []
      }
      accidents_by_severity: {
        Row: {
          created_at: string | null
          id: number
          severity: Database['public']['Enums']['enum_accident_severity']
          value: number
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          severity: Database['public']['Enums']['enum_accident_severity']
          value: number
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          severity?: Database['public']['Enums']['enum_accident_severity']
          value?: number
          year?: number
        }
        Relationships: []
      }
      analytics: {
        Row: {
          id: number
          path: string
          visitor_id: string
          created_at: string
        }
        Insert: {
          id?: number
          path: string
          visitor_id: string
          created_at?: string
        }
        Update: {
          id?: number
          path?: string
          visitor_id?: string
          created_at?: string
        }
        Relationships: []
      }
      fatalities_by_age_group: {
        Row: {
          age_group: Database['public']['Enums']['enum_age_group']
          created_at: string | null
          id: number
          value: number | null
          year: number
        }
        Insert: {
          age_group: Database['public']['Enums']['enum_age_group']
          created_at?: string | null
          id?: number
          value?: number | null
          year: number
        }
        Update: {
          age_group?: Database['public']['Enums']['enum_age_group']
          created_at?: string | null
          id?: number
          value?: number | null
          year?: number
        }
        Relationships: []
      }
      fatalities_by_day: {
        Row: {
          created_at: string | null
          day_of_week: Database['public']['Enums']['enum_day_of_week']
          id: number
          value: number | null
          year: number
        }
        Insert: {
          created_at?: string | null
          day_of_week: Database['public']['Enums']['enum_day_of_week']
          id?: number
          value?: number | null
          year: number
        }
        Update: {
          created_at?: string | null
          day_of_week?: Database['public']['Enums']['enum_day_of_week']
          id?: number
          value?: number | null
          year?: number
        }
        Relationships: []
      }
      fatalities_by_gender: {
        Row: {
          created_at: string | null
          gender: Database['public']['Enums']['enum_gender']
          id: number
          value: number | null
          year: number
        }
        Insert: {
          created_at?: string | null
          gender: Database['public']['Enums']['enum_gender']
          id?: number
          value?: number | null
          year: number
        }
        Update: {
          created_at?: string | null
          gender?: Database['public']['Enums']['enum_gender']
          id?: number
          value?: number | null
          year?: number
        }
        Relationships: []
      }
      fatalities_by_month: {
        Row: {
          created_at: string | null
          id: number
          month: Database['public']['Enums']['enum_month']
          value: number | null
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          month: Database['public']['Enums']['enum_month']
          value?: number | null
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          month?: Database['public']['Enums']['enum_month']
          value?: number | null
          year?: number
        }
        Relationships: []
      }
      greek_cities: {
        Row: {
          created_at: string
          lat: number
          lng: number
          name: Database['public']['Enums']['greek_city']
        }
        Insert: {
          created_at?: string
          lat: number
          lng: number
          name: Database['public']['Enums']['greek_city']
        }
        Update: {
          created_at?: string
          lat?: number
          lng?: number
          name?: Database['public']['Enums']['greek_city']
        }
        Relationships: []
      }
      safety_articles: {
        Row: {
          created_at: string
          description: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      total_accidents: {
        Row: {
          created_at: string | null
          id: number
          value: number
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          value: number
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          value?: number
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      accident_severity: 'low' | 'medium' | 'high'
      enum_accident_severity: 'Fatal' | 'Non-fatal'
      enum_age_group:
        | '0-14'
        | '15-17'
        | '18-20'
        | '21-24'
        | '25-44'
        | '45-64'
        | '>65'
        | 'Unknown'
      enum_area: 'Inside residential areas' | 'Outside residential areas'
      enum_day_of_week:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday'
      enum_gender: 'Men' | 'Female'
      enum_greek_regions:
        | 'Anatoliki Makedonia, Thraki'
        | 'Kentriki Makedonia'
        | 'Dytiki Makedonia '
        | 'Ipeiros'
        | 'Thessalia'
        | 'Ionioi Nisoi'
        | 'Dytiki Ellas'
        | 'Sterea Ellas'
        | 'Attiki'
        | 'Peloponnisos'
        | 'Voreio Aigaio'
        | 'Notio Aigaio'
        | 'Kriti'
      enum_hour_of_accident:
        | '0-4'
        | '5-8'
        | '9-12'
        | '13-16'
        | '17-20'
        | '21-23'
      enum_means_of_transport:
        | 'Passenger cars'
        | 'Motorcycles'
        | 'Moped'
        | 'Bicycles'
        | 'Light goods vehicles up to 3.5t'
        | 'Heavy goods vehicles over 3.5t'
        | 'Buses'
        | 'Other type of vehicle'
        | 'Pedestrians'
      enum_month:
        | 'January'
        | 'February'
        | 'March'
        | 'April'
        | 'May'
        | 'June'
        | 'July'
        | 'August'
        | 'September'
        | 'October'
        | 'November'
        | 'December'
      enum_person_category: 'Drivers' | 'Passengers' | 'Pedestrians'
      enum_road_type:
        | 'Motorway'
        | 'National road'
        | 'Provincial road'
        | 'Municipal Road'
        | 'Other/Unknown'
      greek_city:
        | 'Athens'
        | 'Thessaloniki'
        | 'Patras'
        | 'Heraklion'
        | 'Larissa'
        | 'Volos'
        | 'Rhodes'
        | 'Ioannina'
        | 'Chania'
        | 'Chalkida'
        | 'Alexandroupoli'
        | 'Kavala'
        | 'Kalamata'
        | 'Serres'
        | 'Corfu'
        | 'Mytilene'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
    Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
    DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema['Enums']
  | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema['CompositeTypes']
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      accident_severity: ['low', 'medium', 'high'],
      enum_accident_severity: ['Fatal', 'Non-fatal'],
      enum_age_group: [
        '0-14',
        '15-17',
        '18-20',
        '21-24',
        '25-44',
        '45-64',
        '>65',
        'Unknown',
      ],
      enum_area: ['Inside residential areas', 'Outside residential areas'],
      enum_day_of_week: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      enum_gender: ['Men', 'Female'],
      enum_greek_regions: [
        'Anatoliki Makedonia, Thraki',
        'Kentriki Makedonia',
        'Dytiki Makedonia ',
        'Ipeiros',
        'Thessalia',
        'Ionioi Nisoi',
        'Dytiki Ellas',
        'Sterea Ellas',
        'Attiki',
        'Peloponnisos',
        'Voreio Aigaio',
        'Notio Aigaio',
        'Kriti',
      ],
      enum_hour_of_accident: ['0-4', '5-8', '9-12', '13-16', '17-20', '21-23'],
      enum_means_of_transport: [
        'Passenger cars',
        'Motorcycles',
        'Moped',
        'Bicycles',
        'Light goods vehicles up to 3.5t',
        'Heavy goods vehicles over 3.5t',
        'Buses',
        'Other type of vehicle',
        'Pedestrians',
      ],
      enum_month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      enum_person_category: ['Drivers', 'Passengers', 'Pedestrians'],
      enum_road_type: [
        'Motorway',
        'National road',
        'Provincial road',
        'Municipal Road',
        'Other/Unknown',
      ],
      greek_city: [
        'Athens',
        'Thessaloniki',
        'Patras',
        'Heraklion',
        'Larissa',
        'Volos',
        'Rhodes',
        'Ioannina',
        'Chania',
        'Chalkida',
        'Alexandroupoli',
        'Kavala',
        'Kalamata',
        'Serres',
        'Corfu',
        'Mytilene',
      ],
    },
  },
} as const
