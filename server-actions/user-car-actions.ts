'use server'

import { UserCarsTableRow } from '@/app/dashboard/add-car/_types/types'
import { createClient } from '@/utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'

const supabase = createClient()

const {
  data: { user }
} = await supabase.auth.getUser()

export async function getUserCarWithId(carId: number): Promise<{
  data: UserCarsTableRow | null
  error: PostgrestError | string | null
}> {
  if (!user) return { error: 'The User is not authenticated.', data: null }
  const { data, error } = await supabase
    .from('user_cars')
    .select()
    .eq('id', carId)
    .eq('user_id', user.id)
    .single()

  return { data, error }
}
