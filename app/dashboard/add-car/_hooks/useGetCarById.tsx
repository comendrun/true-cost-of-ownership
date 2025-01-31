import React, { useEffect, useState } from 'react'
import { getCarByIdWithCookieError } from '../_functions/actions'
import { CarFormFields, UserCarsTableRow } from '../_types/types'
import { PostgrestError } from '@supabase/supabase-js'
import { convertUserCarsTableInsertToAdvancedFormValues } from '../_functions/helper-functions'

export default function useGetCarById(id: string | number | null) {
  const [data, setData] = useState<UserCarsTableRow | null>(null)
  const [carEntryFormValues, setCarEntryFormValues] =
    useState<CarFormFields | null>(null)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const triggerFetch = async () => {
    setIsLoading(true)
    if (!id) {
      console.log('the id is not present in the useGetCarById')
      return setIsLoading(false)
    }

    const { data, error } = await getCarByIdWithCookieError(id)
    console.log('The data in the useGetCarById', data)
    console.log('The error in the useGetCarById', error)

    if (error || !data) {
      setError(
        error || {
          message: `There was an error while trying to fetch the car with id: ${id}`
        }
      )
      setIsLoading(false)
      return
    }

    setData(data)
    const formValues = convertUserCarsTableInsertToAdvancedFormValues(data)
    setCarEntryFormValues(formValues)

    setIsLoading(false)
  }

  useEffect(() => {
    triggerFetch()
  }, [id])

  return { data, error, carEntryFormValues, isLoading, triggerFetch }
}
