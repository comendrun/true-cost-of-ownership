import React, { useEffect, useState } from 'react'
import { getCarById } from '../_functions/actions'
import { CarFormFields, UserCarsTableRow } from '../_types/types'
import { PostgrestError } from '@supabase/supabase-js'
import { convertUserCarsTableInsertToAdvancedFormValues } from '../_functions/helper-functions'

export default function useGetCarById(id: string | number | null) {
  const [data, setData] = useState<UserCarsTableRow | null>(null)
  const [carEntryFormValues, setCarEntryFormValues] =
    useState<CarFormFields | null>(null)
  const [error, setError] = useState<PostgrestError | string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const triggerFetch = () => {
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
  }

  useEffect(() => {
    triggerFetch()
  }, [id])

  return { data, error, carEntryFormValues, isLoading, triggerFetch }
}
