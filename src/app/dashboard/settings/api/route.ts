import { convertUserSettingFieldsToUserProfileTableFields } from '@/features/settings/functions/settings.helper.function'
import { UserSettingsFields } from '@/features/settings/types/types'
import { UserProfileUpdate } from '@/types/db.types'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()
  const formValues = (await req.json()) as UserSettingsFields

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

    console.log('user profile', userProfile)

    if (!userProfile || getProfileError) {
      throw new Error('There was an error while fetching the user profile')
    }
    const payload: UserProfileUpdate =
      convertUserSettingFieldsToUserProfileTableFields(formValues, user)

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', user.id)
      .select()
      .single()

    if (!data || error) {
      throw new Error(
        `There was an error while trying to update the user profile: Error: ${error.message}`
      )
    }

    return Response.json(
      { error: null, user: data },
      {
        status: 200
      }
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      'Caught an error while trying to save user profile',
      error?.message ?? error
    )
    return Response.json(
      {
        error:
          error.messsage ??
          'There was an error while trying to update the User Profile.'
      },
      { status: 500 }
    )
  }
}
