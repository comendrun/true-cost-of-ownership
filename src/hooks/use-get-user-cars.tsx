'use client'
import { UserCarsTableRow } from '@/components/types/add-car/types'
import { useUserStore } from '@/lib/users.store'
import { getUserCars } from '@/server-actions/user-car-actions'
import { PostgrestError } from '@supabase/supabase-js'
import React, {
  useCallback,
  useEffect,
  useInsertionEffect,
  useState
} from 'react'

export default function useGetUserCars(
  sort: [string, { ascending: boolean }] = ['created_at', { ascending: false }]
): {
  cars: UserCarsTableRow[] | null
  error: PostgrestError | Error | { message: string } | null
  isLoading: boolean
  triggerFetch: () => Promise<void>
} {
  const user = useUserStore(state => state.user)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<
    PostgrestError | Error | { message: string } | null
  >(null)
  const [cars, setCars] = useState<UserCarsTableRow[] | null>(null)

  const triggerFetch = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await getUserCars({ userId: user?.id })

    if (error || !data) {
      setError({
        message: 'There was an error while trying to fetch the User Cars.'
      })
    } else {
      setCars(data)
    }

    setIsLoading(false)
  }, [user, user?.id])

  useEffect(() => {
    triggerFetch()
  }, [triggerFetch])

  return { cars, error, isLoading, triggerFetch }
}
