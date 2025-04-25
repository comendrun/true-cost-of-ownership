'use server'

import { UserCarsTableRow } from '@/types/db.types'
import { createClient } from '@/utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'

export async function getUserCarWithId(carId: number): Promise<{
  data: UserCarsTableRow | null
  error: PostgrestError | string | null
}> {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) return { error: 'The User is not authenticated.', data: null }
  const { data, error } = await supabase
    .from('user_cars')
    .select()
    .eq('id', carId)
    .eq('user_id', user.id)
    .single()

  console.log('data', data, 'error', error)

  return { data, error }
}

export async function getUserCars({
  userId,
  sort = ['created_at', { ascending: false }]
}: {
  userId?: string
  sort?: [string, { ascending: boolean }]
}): Promise<{
  data: UserCarsTableRow[] | null
  error: Error | PostgrestError | { message: string } | null
  count?: number | null
}> {
  if (!userId)
    return { data: null, error: { message: 'There is no user ID specified.' } }

  // await new Promise(resolve => setTimeout(resolve, 3000))

  const supabase = createClient()

  const { data, error, count } = await supabase
    .from('user_cars')
    .select('*')
    .eq('user_id', userId)
    .order(...sort)

  return { data, error, count }
}
