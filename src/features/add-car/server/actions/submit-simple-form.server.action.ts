'use server'

import { convertObjectToCamelCase } from '@/functions/helper-function'
import { UserCarsTableInsert } from '@/types/db.types'
import { createClient } from '@/utils/supabase/server'
import { SimpleFormFieldsSchema } from '../../types/add-car.simple.schema'
import { SimpleFormFields } from '../../types/add-car.simple.types'
import {
  CarFormFields,
  CarFormOptionalFields
} from '../../types/add-cars.types'
import { getAIFilledOptionalFields } from './get-ai-filled-optional-fields.actions'
import { revalidatePath } from 'next/cache'

export async function submitSimpleFormData(data: SimpleFormFields) {
  const parsedData = SimpleFormFieldsSchema.safeParse(data)

  // console.log('parsedData', parsedData)

  if (!parsedData.success) {
    throw new Error('There was an error validating the form data')
  }

  const formData = parsedData.data

  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error()
  }

  const carFormValues: CarFormFields = {
    ...formData
  }

  const aiFilledOptionalFields: CarFormOptionalFields | null =
    await getAIFilledOptionalFields(carFormValues)

  const fullFormData: CarFormFields = {
    ...formData,
    ...aiFilledOptionalFields
  }

  const payload = {
    ...convertObjectToCamelCase(fullFormData),
    user_id: user.id
  } as UserCarsTableInsert

  const { data: newUserCar, error: insertCarError } = await supabase
    .from('user_cars')
    .insert(payload)
    .select()
    .single()

  console.log('newUserCar', newUserCar)

  if (insertCarError || !newUserCar) {
    console.error(
      '[submitSimpleFormData] - There was an issue while adding the new Car',
      insertCarError?.message,
      newUserCar
    )
    throw new Error('There was an error adding the car to the DB.')
  }

  revalidatePath(`/dashboard/my-cars/${newUserCar.id}`)

  return newUserCar
}
