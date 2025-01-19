'use server'

import { createClient } from '@/utils/supabase/server'

export async function getPaginatedUserCars(
  pageNum: number = 1,
  pageSize: number = 10
) {
  const supabase = createClient()

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser()

  if (getUserError) {
    return { data: [], error: getUserError }
  }

  if (!user) {
    return { data: [], error: new Error('User is not Authenticated') }
  }
  // if the pageNum is 1 and the pageSize is 10, then the range is {from: 0, to: 9}
  // if the pageNum is 2 and the pageSize is 10, then the range is {from: 10, to: 19}
  const range = {
    from: (pageNum - 1) * pageSize,
    to: pageNum * pageSize - 1
  }

  console.log('range', range)

  const { data, error } = await supabase
    .from('user_cars')
    .select()
    .eq('user_id', user?.id)
    .range(range.from, range.to)

  if (error) {
    return { data: [], error }
  }

  return { data, error: null }
}
