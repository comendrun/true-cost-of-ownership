'use server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import CarsGrid from './_components/cars-grid'
import { UserCarsTableRow } from '../add-car/_types/types'
import { getPaginatedUserCars } from './get-paginated-user-cars'

export default async function MyCarsPage() {
  const supabase = createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  const { count: userCarsCount } = await supabase
    .from('user_cars')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // const { data: paginatedCars, error: userCarErrors } = await supabase
  //   .from('user_cars')
  //   .select()
  //   .eq('user_id', user.id)
  //   .order('created_at', { ascending: false })
  //   .range(0, 9)
  const { data: paginatedCars, error: getPaginatedUserCarsError } =
    await getPaginatedUserCars()

  return (
    <CarsGrid
      userCarsCount={userCarsCount}
      initialData={paginatedCars}
      error={getPaginatedUserCarsError}
    />
  )
}
