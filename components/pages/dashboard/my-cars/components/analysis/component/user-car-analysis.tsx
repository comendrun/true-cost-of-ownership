'use client'
import {
  AIAnalysisMetrics,
  AIResponseTableRow,
  UserCarsTableRow
} from '@/components/pages/dashboard/add-car/types/types'
import React from 'react'
import { CostAnalysisLinearChart } from './cost-analysis/major-costs-linear-chart'

export default function UserCarAnalysis({
  car,
  aiResponse
}: {
  car: UserCarsTableRow
  aiResponse: AIResponseTableRow
}) {
  const { analysis_metrics } = aiResponse
  const { costAnalysis } = analysis_metrics as AIAnalysisMetrics
  console.log('analysis', costAnalysis)

  return (
    <>
      <div className='3xl:grid-cols-3 grid auto-rows-min gap-4 xl:grid-cols-2'>
        <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'>
          <CostAnalysisLinearChart car={car} costAnalysis={costAnalysis} />
        </div>
        <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'></div>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
    </>
  )
}
