'use server'

import { createClient } from '@/utils/supabase/server'
import { CarFormValues, UserCarsTableRow } from './_types/types'
import { convertAdvancedFormValuesToUserCarsTableInsert } from './_functions/helper-functions'
import { PostgrestError } from '@supabase/supabase-js'

export const saveCar = async (
  formValues: CarFormValues,
  id: string | number | null
) => {
  console.log('Starting saveCar function')
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No user identified when trying to save the car instance.')
    return null
  }

  console.log('User identified:', user)

  if (id) {
    console.log('Updating existing car with id:', id)
    const { data, error } = await supabase
      .from('user_cars')
      .select()
      .eq('id', id)
      .single()

    if (error || !data) {
      console.error('Error fetching car data or no data found:', error)
      return null
    }

    console.log('Existing car data:', data)

    const updatedValues = Object.keys(data).reduce((acc, key) => {
      const typedKey = key as keyof UserCarsTableRow
      const dbFieldValue = data[typedKey]
      const formFieldValue = formValues[typedKey as keyof CarFormValues]

      if (formFieldValue !== undefined && formFieldValue !== dbFieldValue) {
        acc[typedKey] = formFieldValue as any // Use 'any' to bypass type mismatch
      }

      return acc
    }, {} as Partial<UserCarsTableRow>)

    console.log('Updated values to be saved:', updatedValues)

    const { data: dbUpdatedValues, error: updateError } = await supabase
      .from('user_cars')
      .update(updatedValues)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('There was an error while updating the values', updateError)
      return null
    }

    console.log('Successfully updated car data:', dbUpdatedValues)
    return dbUpdatedValues
  }

  console.log('Inserting new car data')
  const payload = convertAdvancedFormValuesToUserCarsTableInsert(
    formValues,
    user.id
  )

  console.log('Payload for new car:', payload)

  const { data, error } = await supabase
    .from('user_cars')
    .insert(payload)
    .select()
    .single()

  if (error || !data) {
    console.error(
      'There was an error while trying to insert a new user car in the db.',
      error
    )
    return null
  }

  console.log('Successfully inserted new car data:', data)
  return data
}

export async function getCarById(
  id: string | number
): Promise<{
  data: UserCarsTableRow | null
  error: PostgrestError | string | null
}> {
  if (!id)
    return {
      data: null,
      error: 'No id for the operation was provided'
    }
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No user identified when trying to fetch the car instance.')
    return {
      data: null,
      error: 'No user identified when trying to fetch the car instance.'
    }
  }

  const { data, error } = await supabase
    .from('user_cars')
    .select()
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error(
      '[getCarById] - Error fetching car data or no data found:',
      error
    )
  }

  return { error, data }
}
