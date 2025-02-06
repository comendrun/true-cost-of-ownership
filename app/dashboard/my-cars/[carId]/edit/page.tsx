import CarForm from '@/app/dashboard/add-car/_components/car-form'
import { getCarById } from '@/app/dashboard/add-car/_functions/save-car-server-functions'
import ErrorPage from '@/components/ui/page-components/error-page-component'
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

  const { data, error } = await getCarById(carId)

  if (error || !data) {
    return (
      <ErrorPage
        title='Oops! Something went wrong!'
        description="You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."
        bounce
        buttonTitle='New Form'
        href='/dashboard/add-car/advanced'
      />
    )
  }

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Suspense fallback={<div>Loading...</div>}>
        <CarForm id={carId} user={user} carData={data} />
      </Suspense>
    </div>
  )
}
