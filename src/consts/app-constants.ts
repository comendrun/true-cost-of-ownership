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

export enum CURRENCIES {
  EUR = '€',
  USD = '$',
  GBP = '£'
}
