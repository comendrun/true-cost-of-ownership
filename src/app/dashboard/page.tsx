'use server'

import UserCarsOverview from '@/components/pages/dashboard/components/user-cars-overview'
import ErrorPage from '@/components/ui/page-components/error-page-component'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser()

  if (getUserError || !user) {
    return <ErrorPage />
  }

  const { data: userCars, error: getUserCarsError } = await supabase
    .from('user_cars')
    .select('*')
    .eq('user_id', user.id)

  if (!userCars || getUserCarsError) {
    return (
      <ErrorPage description='There was an error while trying to get the User cars' />
    )
  }

  return (
    <>
      <div className='grid auto-rows-min gap-4 md:grid-cols-2'>
        {/* <div className='aspect-video rounded-xl bg-muted/50' /> */}
        <div className='aspect-video rounded-xl bg-muted/50 p-5'>
          <UserCarsOverview userCars={userCars} />
        </div>
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
    </>
  )
}
