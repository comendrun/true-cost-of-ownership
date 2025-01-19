'use server'

import { createClient } from '@/utils/supabase/server'
import UserCarAnalysis from './_component/user-car-analysis'

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
    return <div>Error loading data. Please try again later.</div>
  }

  return (
    <>
      <UserCarAnalysis car={userCar} aiResponse={aiResponse} />
    </>
  )
}
