'use server'

import UserAnalysisOverview from '@/components/pages/dashboard/components/user-analysis-overview'
import UserCarsOverview from '@/components/pages/dashboard/components/user-cars-overview'
import ErrorPage from '@/components/ui/page-components/error-page-component'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'

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
    .order('created_at', { ascending: false })

  const userCarsIds = userCars?.reduce((acc, car) => {
    acc.push(car?.id)
    return acc
  }, [] as number[])

  const { data: userAnalysis, error: getUserAnalysisError } = await supabase
    // .from('ai_responses')
    // .select('*')
    // .in('car_id', userCarsIds || [])
    // .order('created_at', { ascending: false })
    .rpc('get_latest_ai_responses', { car_ids: userCarsIds || [] })

  return (
    <>
      <div className='grid auto-rows-min gap-4 xl:grid-cols-2'>
        {/* <div className='aspect-video rounded-xl bg-muted/50' /> */}

        <Suspense
          fallback={
            <Skeleton className='aspect-video rounded-xl bg-muted/50 p-5' />
          }
        >
          <div className='aspect-video rounded-xl bg-muted/50 p-5'>
            <UserCarsOverview userCars={userCars} />
          </div>
        </Suspense>
        <div className='aspect-video rounded-xl bg-muted/50 p-5'>
          <UserAnalysisOverview
            userAnalysisList={userAnalysis}
            userCars={userCars}
          />
        </div>
      </div>
      {/* <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' /> */}
    </>
  )
}
