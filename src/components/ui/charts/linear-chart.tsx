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
import { ReactNode } from 'react'
import { ChartProps } from './types'

export function LinearChart({
  title,
  description,
  chartData,
  footer,
  chartConfig,
  hideTooltipLabel = false
}: ChartProps) {
  console.log('Object.keys(chartData)', Object.keys(chartData[0]))

  return (
    <Card className='h-full min-h-full min-w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
              dataKey={Object.keys(chartData[0])[0]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={hideTooltipLabel} />}
            />
            <Line
              dataKey={Object.keys(chartData[0])[1]}
              type='natural'
              // stroke='var(--accent)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      {footer && (
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            {footer?.title} <TrendingUp className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            {footer?.description}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
