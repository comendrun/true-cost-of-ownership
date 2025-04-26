'use client'
import React from 'react'
import { AnnualCostLinearChart } from './charts/cost-analysis/annual-costs-linear-chart'
import MajorExpensesChart from './charts/cost-analysis/major-expenses-chart'
import ComparisonMetricsChart from './charts/comparison-metrics/comparison-metrics-chart'
import { ResaleValueInsightsLinearChart } from './charts/resale-value/resale-value-insights-chart'
import {
  AIAnalysisMetrics,
  CostAnalysis,
  ComparisonMetrics
} from '@/features/my-cars/types/analysis.types'
import { UserCarsTableRow, AIResponseTableRow } from '@/types/db.types'

export default function UserCarAnalysis({
  car,
  aiResponse
}: {
  car: UserCarsTableRow
  aiResponse: AIResponseTableRow
}) {
  const { analysis_metrics } = aiResponse

  const parsedMetrics =
    typeof analysis_metrics === 'string'
      ? (JSON.parse(analysis_metrics) as AIAnalysisMetrics)
      : null
  const costAnalysis: CostAnalysis | null = parsedMetrics?.costAnalysis || null
  const comparisonMetrics: ComparisonMetrics | null =
    parsedMetrics?.comparisonMetrics || null

  const resaleValueInsights = parsedMetrics?.resaleValueInsights

  console.log('parsed Metrics', parsedMetrics)

  return (
    <>
      <div className='3xl:grid-cols-3 grid auto-rows-fr auto-rows-min gap-4 xl:grid-cols-2'>
        {costAnalysis && (
          <>
            <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'>
              <AnnualCostLinearChart car={car} costAnalysis={costAnalysis} />
            </div>
            <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'>
              <MajorExpensesChart car={car} costAnalysis={costAnalysis} />
            </div>
          </>
        )}
        {/* Annual Cost Analysis */}
        {comparisonMetrics && (
          <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'>
            <ComparisonMetricsChart
              car={car}
              comparisonMetrics={comparisonMetrics}
            />
          </div>
        )}
        {resaleValueInsights && (
          <div className='flex max-w-full items-center justify-center rounded-xl bg-muted/50'>
            <ResaleValueInsightsLinearChart
              car={car}
              resaleValueInsights={resaleValueInsights}
            />
          </div>
        )}
      </div>
    </>
  )
}
