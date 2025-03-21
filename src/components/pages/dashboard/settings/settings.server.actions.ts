'use server'

import {
  UserProfile,
  UserProfileUpdate
} from '@/features/add-car/types/add-cars.types'
import { UserSettingsFields } from '@/features/settings/types/types'
import { createClient } from '@/utils/supabase/server'
import { convertUserSettingFieldsToUserProfileTableFields } from './settings.helper.function'

export async function updateUserProfile({
  formValues
}: {
  formValues: UserSettingsFields
}) {
  const supabase = createClient()

  try {
    const {
      data: { user },
      error: getUserError
    } = await supabase.auth.getUser()

    if (!user || getUserError) {
      throw new Error('The user is not authenticated.')
    }

    const { data: userProfile, error: getProfileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single()

    if (!userProfile || getProfileError) {
      throw new Error('There was an error while fetching the user profile')
    }
    const payload: UserProfileUpdate =
      convertUserSettingFieldsToUserProfileTableFields(formValues, user)

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .select('*')
      .single()

    if (!data || error) {
      throw new Error(
        'There was an error while trying to update the user profile.'
      )
    }

    return { data, error: null }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message:
          error?.message ??
          'There was an error while trying to update the User Profile.'
      }
    }
  }
}
