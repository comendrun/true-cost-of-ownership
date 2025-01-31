import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import CarForm from '../_components/car-form'
import { FORM_ERROR_MESSAGE } from '../_consts/consts'

export default async function CarsPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const cookieStore = await cookies()
  const error = cookieStore.get(FORM_ERROR_MESSAGE)?.value

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Suspense fallback={<div>Loading...</div>}>
        <CarForm id={null} user={user} pageError={error} />
      </Suspense>
    </div>
  )
}
