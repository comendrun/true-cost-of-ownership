import CarForm from '@/app/dashboard/add-car/_components/car-form'
import { getCarByIdWithCookieError } from '@/app/dashboard/add-car/_functions/actions'
import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'

export default async function CarEditPage({
  params
}: {
  params: { carId: number }
}) {
  const { carId } = params
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Suspense fallback={<div>Loading...</div>}>
        <CarForm id={carId} user={user} />
      </Suspense>
    </div>
  )
}
