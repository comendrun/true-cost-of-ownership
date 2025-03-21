'use server'
import { UserProfileUpdate } from '@/types/db.types'
import { createClient } from '@/utils/supabase/server'
import { convertUserSettingFieldsToUserProfileTableFields } from '../../functions/settings.helper.function'
import { UserSettingsFields } from '../../types/types'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
