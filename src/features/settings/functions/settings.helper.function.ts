import { UserProfileUpdate } from '@/types/db.types'
import { UserConfig } from '@/types/user.types'
import { UserSettingsFields } from '../types/types'

export function convertUserSettingFieldsToUserProfileTableFields(
  {
    email,
    firstName,
    lastName,
    preferredCountry,
    preferredCurrency,
    username
  }: UserSettingsFields,
  user: UserProfileUpdate
): UserProfileUpdate {
  const config: UserConfig = {}
  const result: UserProfileUpdate = {}
  result.id = user.id
  if (email) result.email = email
  if (firstName) result.first_name = firstName
  if (lastName) result.last_name = lastName
  if (username) result.username = username
  if (preferredCountry) config.preferredCountry = preferredCountry
  else config.preferredCountry = 'GERMANY'
  if (preferredCurrency) config.preferredCurrency = preferredCurrency
  else config.preferredCurrency = 'EUR'
  if (config) result.config = config

  return result
}
