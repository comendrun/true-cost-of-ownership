import { COUNTRIES_TYPE } from '@/components/types/add-car/types'

export const COUNTRIES = [
  'GERMANY',
  'UNITED KINGDOM',
  'UNITED STATES OF AMERICA',
  'AUSTRIA',
  'NETHERLANDS',
  'FRANCE',
  'BELGIUM'
] as const

export const CURRENCIES = ['EUR', 'USD', 'GBP'] as const

export enum LOCAL_STORAGE_KEYS {
  USER_INFO_LOCAL_STORAGE_KEY = 'USER_PROFILE_INFO'
}
