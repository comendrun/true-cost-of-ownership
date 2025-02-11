'use client'
import {
  AIAnalysisMetrics,
  AIResponseTableRow,
  CostAnalysis,
  UserCarsTableRow
} from '@/components/pages/dashboard/add-car/types/types'
import React from 'react'
import { AnnualCostLinearChart } from './cost-analysis/annual-costs-linear-chart'

export default function UserCarAnalysis({
  car,
  aiResponse
}: {
  car: UserCarsTableRow
  aiResponse: AIResponseTableRow
}) {
  const { analysis_metrics } = aiResponse

  let costAnalysis: CostAnalysis | null = null

  const parsedMetrics =
    typeof analysis_metrics === 'string'
      ? (JSON.parse(analysis_metrics) as AIAnalysisMetrics)
      : null
  costAnalysis = parsedMetrics?.costAnalysis || null

  console.log('parsed Metrics', parsedMetrics)
  

  return (
    <>
      <div className='3xl:grid-cols-3 grid auto-rows-min gap-4 xl:grid-cols-2'>
        <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'>
          <AnnualCostLinearChart car={car} costAnalysis={costAnalysis} />
        </div>
        <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'></div>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
    </>
  )
}
