import { convertUserSettingFieldsToUserProfileTableFields } from '@/components/pages/dashboard/settings/settings.helper.function'
import { UserProfileUpdate } from '@/components/types/add-car/types'
import { UserSettingsFields } from '@/components/types/settings/types'
import { createClient } from '@/utils/supabase/server'
// import { NextApiRequest, NextApiResponse } from 'next'

export type UserProfileResponseData = {
  error: string | null
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient()
  const formValues = (await req.json()) as UserSettingsFields

  console.log('formvalues', formValues)

  try {
    const {
      data: { user },
      error: getUserError
    } = await supabase.auth.getUser()

    if (!user || getUserError) {
      throw new Error('The user is not authenticated.')
    }

    console.log('user', user)

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
    console.log('payload', payload)

    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', user.id)
      .select()
    // .single()

    if (!data || error) {
      throw new Error(
        `There was an error while trying to update the user profile: Error: ${error.message}`
      )
    }

    console.log('data', data)
    console.log('error', error)

    return res.status(200).json(
      { error: null },
      {
        status: 200
      }
    )
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
