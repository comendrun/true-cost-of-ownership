'use server'
import ErrorPage from '@/components/ui/page-components/error-page-component'
import UserCarAnalysis from '@/features/my-cars/components/analysis/component/user-car-analysis'
import { createClient } from '@/utils/supabase/server'

export default async function UserCarAnalysisPage({
  params
}: {
  params: { carId: number }
}) {
  const { carId } = params
  const supabase = createClient()

  const { data: userCar, error: userCarError } = await supabase
    .from('user_cars')
    .select()
    .eq('id', carId)
    .single()

  const { data: aiResponse, error: getAIResponseError } = await supabase
    .from('ai_responses')
    .select()
    .eq('car_id', carId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (userCarError || getAIResponseError || !userCar || !aiResponse) {
    return (
      <ErrorPage
        title='Oops'
        description="Error loading data or this car don't have any analysis yet. Please try again later."
        buttonTitle='Car Details'
        href={`/dashboard/my-cars/${carId}`}
        bounce={false}
      />
    )
  }

  return (
    <>
      <UserCarAnalysis car={userCar} aiResponse={aiResponse} />
    </>
  )
}
