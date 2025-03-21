'use client'
import React from 'react'
import UserAnalysisOverview from './user-analysis-overview'
import UserCarsOverview from './user-cars-overview'
import useGetUserCars from '@/features/settings/hooks/use-get-user-cars'

export default function DashboardView() {
  const { cars, isLoading } = useGetUserCars()

  const userCarsWithAnalysis = cars?.filter(car => car.last_ai_response_id)

  return (
    <>
      <UserCarsOverview userCars={cars} isLoading={isLoading} />
      <UserAnalysisOverview
        userCarsWithAnalysis={userCarsWithAnalysis}
        isLoading={isLoading}
      />
    </>
  )
}
