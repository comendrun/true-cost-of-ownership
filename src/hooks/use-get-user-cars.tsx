'use client'
import { useUserStore } from '@/hooks/users.store'
import { getUserCars } from '@/server/actions/user-car-actions'
import { UserCarsTableRow } from '@/types/db.types'
import { PostgrestError } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'

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
    if (!user?.id) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const { data, error } = await getUserCars({ userId: user.id })
      if (error || !data) {
        setError({
          message: 'There was an error while trying to fetch the User Cars.'
        })
      } else {
        setCars(data)
        setError(null)
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    triggerFetch()
  }, [triggerFetch])

  return { cars, error, isLoading, triggerFetch }
}
