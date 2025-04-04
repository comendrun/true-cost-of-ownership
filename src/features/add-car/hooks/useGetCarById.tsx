'use client'
import { UserCarsTableRow } from '@/types/db.types'
import { useCallback, useEffect, useState } from 'react'
import { convertUserCarsTableInsertToAdvancedFormValues } from '../functions/advanced-form-helper-functions'
import { getCarById } from '../server/actions/save-car.server.actions'
import { CarFormFields } from '../types/add-cars.types'

export default function useGetCarById(id: string | number | null) {
  const [data, setData] = useState<UserCarsTableRow | null>(null)
  const [carEntryFormValues, setCarEntryFormValues] =
    useState<CarFormFields | null>(null)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const triggerFetch = useCallback(async () => {
    setIsLoading(true)
    if (!id) {
      console.log('the id is not present in the useGetCarById')
      return setIsLoading(false)
    }

    const { data, error } = await getCarById(id)
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
  }, [id]) // ✅ Now it only changes when id changes

  useEffect(() => {
    triggerFetch()
  }, [triggerFetch]) // ✅ No more ESLint warning

  return { data, error, carEntryFormValues, isLoading, triggerFetch }
}
