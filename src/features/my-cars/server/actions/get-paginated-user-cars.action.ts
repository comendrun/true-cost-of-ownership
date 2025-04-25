'use server'

import { UserCarsTableRow } from '@/types/db.types'
import { createClient } from '@/utils/supabase/server'
import { AuthError, PostgrestError } from '@supabase/supabase-js'

export async function getPaginatedUserCars(
  pageNum: number = 1,
  pageSize: number = 10
): Promise<{
  data: UserCarsTableRow[] | null
  error: { message: string } | null
  total?: number
}> {
  const supabase = createClient()

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser()

  if (getUserError) {
    return handleGetPaginatedUserCarsError(
      getUserError,
      'There was an error while fetching the User information.'
    )
  }

  if (!user) {
    return handleGetPaginatedUserCarsError(null, 'User is not Authenticated')
  }

  const { count: userCarsCount } = await supabase
    .from('user_cars')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if (!userCarsCount || userCarsCount <= 0) {
    return { data: [], error: null }
  }

  const range = {
    from: (pageNum - 1) * pageSize,
    to: pageNum * pageSize - 1
  }

  const { data, error } = await supabase
    .from('user_cars')
    .select()
    .eq('user_id', user?.id)
    .range(range.from, range.to)

  if (error) {
    return handleGetPaginatedUserCarsError(
      error,
      'There was an error while getting usre cars from DB'
    )
  }

  return { data, error: null, total: userCarsCount }
}

function handleGetPaginatedUserCarsError(
  error: PostgrestError | AuthError | null,
  message: string
): {
  data: null
  error: { message: string } | null
} {
  console.error(`[getPaginatedUserCars] ${message}`, error?.message)

  return {
    data: null,
    error: { message }
  }
}
