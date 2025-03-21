'use client'

import { ChartConfig } from '@/components/ui/chart'
import { LinearChart } from '@/components/ui/charts/linear-chart'
import { CostAnalysisCharts } from '@/features/my-cars/types/analysis.types'

const chartConfig = {
  totalCost: {
    label: 'Total Cost',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function AnnualCostLinearChart({
  car,
  costAnalysis
}: CostAnalysisCharts) {
  const chartData = costAnalysis?.annualCostProjection?.map(yearProjection => ({
    ...yearProjection
  }))

  return (
    <LinearChart
      title='Cost Analysis over Years'
      description={`over ${costAnalysis?.annualCostProjection.length} years`}
      chartData={chartData || []}
      chartConfig={chartConfig}
      footer={{
        title: `On Average, ${car.brand} - ${car.model} - (${car.year}) will have a
          monthly cost of: ${costAnalysis?.averageMonthlyCost} Euros`
      }}
    />
  )
}
