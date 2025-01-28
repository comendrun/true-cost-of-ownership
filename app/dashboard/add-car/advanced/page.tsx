import { createClient } from '@/utils/supabase/server'
import CarForm from '../_components/car-form'
import { getCarById } from '../_functions/actions'
import { Suspense } from 'react'

export default async function CarsPage({
  searchParams
}: {
  searchParams: { [key: string]: string }
}) {
  const id = searchParams?.['id']

  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  let error: string | null = null

  if (id) {
    const { data, error: fetchError } = await getCarById(id)

    if (fetchError || data?.user_id !== user?.id) {
      console.table({ fetchError })
      error =
        "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."
    } // else if (data?.user_id !== user?.id) {
    //   error =
    //     "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."
    // }
  }

  console.log('error in the advanced form page', error)

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Suspense fallback={<div>Loading...</div>}>
        <CarForm id={error ? null : id} user={user} pageError={error} />
      </Suspense>
    </div>
  )
}
