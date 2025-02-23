'use server'

import { createClient } from '@/utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { FieldValues } from 'react-hook-form'
import {
  convertAdvancedFormValuesToUserCarsTableInsert,
  convertUserCarsTableInsertToAdvancedFormValues
} from './advanced-form-helper-functions'
import { getAIFilledOptionalFields } from './openai/get-ai-filled-optional-fields'
import {
  CarFormFields,
  UserCarsTableRow,
  CarFormOptionalFields,
  userCarTableToFormKeyMapping
} from '@/components/types/add-car/types'

export async function saveCar(formValues: CarFormFields): Promise<{
  data: UserCarsTableRow | null
  error: PostgrestError | { message: string } | null
}> {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No user identified when trying to save the car instance.')
    return {
      data: null,
      error: { message: 'The User is not authenticated.' }
    }
  }

  const payload = convertAdvancedFormValuesToUserCarsTableInsert(
    formValues,
    user.id
  )

  const { data, error } = await supabase
    .from('user_cars')
    .insert(payload)
    .select()
    .single()

  revalidatePath(`/dashboard/my-cars/${data?.id}/`, 'page')
  revalidatePath(`/dashboard/my-cars/${data?.id}/edit`, 'page')

  return { data, error }
}

export async function saveCarAndGetRecommendations(
  formValues: CarFormFields
): Promise<{
  carFormOptionalFields: CarFormOptionalFields | null
  error: { message: string } | null
  id?: number
}> {
  try {
    const supabase = createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      console.error('No user identified when trying to save the car instance.')
      throw new Error('The User is not authenticated.')
    }

    const { data, error } = await saveCar(formValues)

    if (error || !data) {
      console.error(
        'There was an error while trying to insert a new user car in the db.',
        error
      )
      throw new Error(
        error?.message || 'There was an error while saving the car.'
      )
    }

    const updatedFormValues = convertUserCarsTableInsertToAdvancedFormValues(
      data
    ) as CarFormFields

    const aiFilledOptionalFields =
      await getAIFilledOptionalFields(updatedFormValues)

    return {
      carFormOptionalFields: aiFilledOptionalFields, // ToDo: Update
      error: null,
      id: data.id
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      carFormOptionalFields: null,
      error: {
        message:
          error?.message ||
          'There was an error while saving the new values and getting recommendations.'
      }
    }
  }
}

export async function updateCar<TFormValues extends FieldValues>(
  formValues: TFormValues,
  id: string | number
): Promise<{
  data: UserCarsTableRow | null
  error: PostgrestError | { message: string } | null
}> {
  const supabase = createClient()

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No user identified when trying to save the car instance.')
    return {
      data: null,
      error: { message: 'The User is not authenticated.' }
    }
  }

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
    const dbFieldValue = data[dbKey]
    const formFieldValue = formValues[formKey as keyof TFormValues]

    if (formFieldValue !== undefined && formFieldValue !== dbFieldValue) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      acc[dbKey] = formFieldValue as any // I'm using 'any' here to bypass type mismatch
      if (dbKey === 'planned_years_of_ownership') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        acc['resale_value_after_years'] = formFieldValue as any
      }
    }
    return acc
  }, {} as Partial<UserCarsTableRow>)

  if (Object.entries(updatedValues).length === 0) {
    console.error('No changes detected, nothing to update.')
    return {
      data: data,
      error: { message: 'No changes detected, nothing to update.' }
    }
  }

  const { data: updatedCar, error: updateError } = await supabase
    .from('user_cars')
    .update({ ...updatedValues, version: Number(data.version) + 1 })
    .eq('id', id)
    .select()
    .single()

  revalidatePath(`/dashboard/my-cars/${id}/`, 'page')
  revalidatePath(`/dashboard/my-cars/${id}/edit`, 'page')

  return { data: updatedCar, error: updateError }
}

export async function updateCarAndGetRecommendations<
  TFormValues extends FieldValues
>(
  formValues: TFormValues,
  id: string | number
): Promise<{
  carFormOptionalFields: CarFormOptionalFields | null
  error: { message: string } | null
}> {
  try {
    const supabase = createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      console.error('No user identified when trying to save the car instance.')
      return {
        carFormOptionalFields: null,
        error: { message: 'The User is not authenticated.' }
      }
    }

    const { data: updatedCar, error: updateError } =
      await updateCar<TFormValues>(formValues, id)

    if (updateError || !updatedCar) {
      console.error('There was an error while updating the values', updateError)
      throw new Error(updateError?.message)
    }

    const updatedFormValues = convertUserCarsTableInsertToAdvancedFormValues(
      updatedCar
    ) as CarFormFields

    const aiFilledOptionalFields =
      await getAIFilledOptionalFields(updatedFormValues)

    return {
      carFormOptionalFields: aiFilledOptionalFields, // ToDo: Update
      error: null
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      carFormOptionalFields: null,
      error: {
        message:
          error?.message || 'There was an error while saving the new values.'
      }
    }
  }
}

export async function getCarById(id: string | number): Promise<{
  data: UserCarsTableRow | null
  error: { message: string } | null
}> {
  try {
    if (!id) throw new Error('No id for the operation was provided')
    // return {
    //   data: null,
    //   error: {message: 'No id for the operation was provided'}
    // }
    const supabase = createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      console.error('No user identified when trying to fetch the car instance.')
      // return {
      //   data: null,
      //   error: 'No user identified when trying to fetch the car instance.'
      // }
      throw new Error(
        'No user identified when trying to fetch the car instance.'
      )
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

      throw new Error(
        error?.message || 'Error fetching car data or no data found'
      )
    }

    return { error, data }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('[getCarById], error:', err.message)

    return {
      error: {
        message:
          "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."
      },
      data: null
    }
  }
}
