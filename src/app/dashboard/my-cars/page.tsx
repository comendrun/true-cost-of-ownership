'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getPaginatedUserCars } from '@/features/my-cars/server/actions/get-paginated-user-cars.action'
import CarsGrid from '@/features/my-cars/components/cars-grid'

export default async function MyCarsPage() {
  const supabase = createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  return (
    <CarsGrid
    // userCarsCount={userCarsCount}
    // initialData={paginatedCars}
    // error={getPaginatedUserCarsError}
    />
  )
}
