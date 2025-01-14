import { createClient } from '@/utils/supabase/server'
import CarForm from '../_components/car-form'
import { getCarById } from '../actions'
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
    if (fetchError)
      return (error = 'There was an error fetching the requested entry.')

    if (data?.user_id !== user?.id) {
      error =
        "You don't have access to this entity. Please start with a fresh form."
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Suspense fallback={<div>Loading...</div>}>
        <CarForm id={error ? null : id} user={user} pageError={error} />
      </Suspense>
    </div>
  )
}
