'use client'

import {
  ResaleValueInsights,
  UserCarsTableRow
} from '@/components/types/add-car/types'
import { ChartConfig } from '@/components/ui/chart'
import { LinearChart } from '@/components/ui/charts/linear-chart'

const chartConfig = {
  resaleValueProjections: {
    label: 'Total Cost',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function ResaleValueInsightsLinearChart({
  car,
  resaleValueInsights
}: {
  car: UserCarsTableRow
  resaleValueInsights: ResaleValueInsights
}) {
  const chartData = resaleValueInsights[0].resaleValueProjections

  return (
    <LinearChart
      title='Resale value of the Car over Years'
      description={`From ${chartData[0].year} to ${chartData[chartData.length - 1].year}`}
      chartData={chartData || []}
      chartConfig={chartConfig}
      //   footer={{
      //     footerTitle: `On Average, ${car.brand} - ${car.model} - (${car.year}) will have a
      //       monthly cost of: ${costAnalysis?.averageMonthlyCost} Euros`
      //   }}
    />
  )
}
