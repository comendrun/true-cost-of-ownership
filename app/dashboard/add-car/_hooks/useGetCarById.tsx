import React, { useEffect, useState } from 'react'
import { getCarById } from '../_functions/actions'
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
    if (!id) return setIsLoading(false)

    // getCarById(id)
    //   .then(response => {
    //     setData(response.data)
    //     if (response.data) {
    //       const formValues = convertUserCarsTableInsertToAdvancedFormValues(
    //         response.data
    //       )
    //       setCarEntryFormValues(formValues)
    //     }
    //     if (response?.error) {
    //       setError(response?.error)
    //     }
    //   })
    //   .catch(err => {
    //     console.error('Error while performing the postgresql fetch', err)
    //     setError(err)
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })

    const { data, error } = await getCarById(id)

    if (error || !data) {
      setError(
        error || {
          message: `There was an error while trying to fetch the car with id: ${id}`
        }
      )
      setIsLoading(false)
      return
    }

    const formValues = convertUserCarsTableInsertToAdvancedFormValues(data)
    setCarEntryFormValues(formValues)

    setIsLoading(false)
  }

  useEffect(() => {
    triggerFetch()
  }, [id])

  return { data, error, carEntryFormValues, isLoading, triggerFetch }
}
