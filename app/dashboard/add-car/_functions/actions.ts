'use server'

import { createClient } from '@/utils/supabase/server'
import {
  CarFormValues,
  UserCarsTableRow,
  userCarTableToFormKeyMapping
} from '../_types/types'
import { convertAdvancedFormValuesToUserCarsTableInsert } from './helper-functions'
import { PostgrestError } from '@supabase/supabase-js'

export async function saveCar(
  formValues: CarFormValues,
  id: string | number | null
): Promise<{ data: UserCarsTableRow | null; error?: { message: string } }> {
  console.log('Starting saveCar function')
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No user identified when trying to save the car instance.')
    return { data: null, error: { message: 'The User is not authenticated.' } }
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
      return {
        data: null,
        error: {
          message: error?.message || 'Error fetching car data or no data found.'
        }
      }
    }

    const updatedValues = Object.keys(data).reduce((acc, key) => {
      const dbKey = key as keyof UserCarsTableRow
      const formKey =
        userCarTableToFormKeyMapping[dbKey as keyof UserCarsTableRow]

      console.log('typed Key', dbKey)

      const dbFieldValue = data[dbKey]
      console.log('db field value', dbFieldValue)

      const formFieldValue = formValues[formKey as keyof CarFormValues]
      console.log('form field value', formFieldValue)

      if (formFieldValue !== undefined && formFieldValue !== dbFieldValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        acc[dbKey] = formFieldValue as any // I'm using 'any' here to bypass type mismatch
      }
      return acc
    }, {} as Partial<UserCarsTableRow>)

    console.log('Updated values to be saved:', updatedValues)

    if (Object.entries(updatedValues).length === 0) {
      console.log('No changes detected, nothing to update.')
      return {
        data: data,
        error: { message: 'No changes detected, nothing to update.' }
      }
    }

    const { data: dbUpdatedValues, error: updateError } = await supabase
      .from('user_cars')
      .update({ ...updatedValues, version: Number(data.version) + 1 })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('There was an error while updating the values', updateError)
      return {
        data: null,
        error: { message: updateError.message }
      }
    }

    console.log('Successfully updated car data:', dbUpdatedValues)
    return {
      data: dbUpdatedValues,
      error: undefined
    }
  }

  console.log('Inserting new car data')
  const payload = convertAdvancedFormValuesToUserCarsTableInsert(
    formValues,
    user.id
  )

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
    return {
      data: null,
      error: {
        message:
          error?.message ||
          'There was an error while trying to insert a new user car in the db.'
      }
    }
  }

  console.log('Successfully inserted new car data:', data)
  return { data, error: undefined }
}

export async function getCarById(id: string | number): Promise<{
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
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    console.error(
      '[getCarById] - Error fetching car data or no data found:',
      error
    )
  }

  return { error, data }
}
