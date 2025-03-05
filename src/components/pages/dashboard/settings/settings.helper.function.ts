import { UserProfileUpdate } from '@/components/types/add-car/types'
import { UserSettingsFields } from '@/components/types/settings/types'

export function convertUserSettingFieldsToUserProfileTableFields({
  email,
  firstName,
  lastName,
  preferredCountry,
  preferredCurrency,
  username
}: UserSettingsFields): UserProfileUpdate {
  const config = {
    preferredCountry,
    preferredCurrency
  }
  return {
    email: email as string,
    first_name: firstName as string,
    last_name: lastName as string,
    username: username as string,
    config: JSON.stringify(config)
  }
}
