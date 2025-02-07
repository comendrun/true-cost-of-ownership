'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  CostAnalysis,
  UserCarsTableRow
} from '@/components/pages/dashboard/add-car/types/types'

// const chartData = [
//   { month: 'January', desktop: 186 },
//   { month: 'February', desktop: 305 },
//   { month: 'March', desktop: 237 },
//   { month: 'April', desktop: 73 },
//   { month: 'May', desktop: 209 },
//   { month: 'June', desktop: 214 }
// ]

const chartConfig = {
  totalCost: {
    label: 'Total Cost',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function CostAnalysisLinearChart({
  car,
  costAnalysis
}: {
  car: UserCarsTableRow
  costAnalysis: CostAnalysis
}) {
  const chartData = costAnalysis?.annualCostProjection?.map(yearProjection => ({
    ...yearProjection
  }))

  return (
    <Card className='min-w-full'>
      <CardHeader>
        <CardTitle>Cost Analysis over Years</CardTitle>
        <CardDescription>
          over {costAnalysis?.annualCostProjection.length} years
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='max-w-full' config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            // margin={{
            //   left: 12,
            //   right: 12
            // }}
            // width={10}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='year'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey='totalCost'
              type='natural'
              // stroke='var(--accent)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
