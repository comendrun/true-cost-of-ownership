import { Database } from './database.types'

export type UserCarsTableRow = Database['public']['Tables']['user_cars']['Row']

export type UserProfile = Database['public']['Tables']['profiles']['Row']

export type UserProfileUpdate =
  Database['public']['Tables']['profiles']['Update']

export type UserCarsTableInsert =
  Database['public']['Tables']['user_cars']['Insert']

export type UserCarsTableKeysRow = keyof UserCarsTableRow

export type UserCarsTableKeysInsert = keyof UserCarsTableInsert

export type AIResponseTableRow =
  Database['public']['Tables']['ai_responses']['Row']

export type AIResponseTableInsert =
  Database['public']['Tables']['ai_responses']['Insert']

export type COUNTRIES_TYPE = Database['public']['Enums']['COUNTRIES']
