import React from 'react'
import { getCarById } from '../actions'
import { CarFormValues, UserCarsTableRow } from '../_types/types'

import { useEffect, useState } from 'react'
import { PostgrestError } from '@supabase/supabase-js'
import { convertUserCarsTableInsertToAdvancedFormValues } from '../_functions/helper-functions'

export default function useGetCarById(id: string | number | null) {
  const [data, setData] = useState<UserCarsTableRow | null>(null)
  const [carEntryFormValues, setCarEntryFormValues] =
    useState<CarFormValues | null>(null)
  const [error, setError] = useState<PostgrestError | string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (!id) return setIsLoading(false)

    getCarById(id)
      .then(response => {
        setData(response.data)
        if (response.data) {
          const formValues = convertUserCarsTableInsertToAdvancedFormValues(
            response.data
          )
          setCarEntryFormValues(formValues)
        }
        if (response.error) {
          setError(response.error)
        }
      })
      .catch(err => {
        console.error('Error while performing the postgresql fetch', err)
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return { data, error, carEntryFormValues, isLoading }
}
