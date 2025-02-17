'use client'
import { CostAnalysisCharts } from '@/components/types/analysis/types'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

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
import { MyPieChart } from '@/components/ui/charts/pie-chart'
import { MajorExpenseCategory } from '@/components/types/add-car/types'
import { convertStringToCamelCase } from '@/functions/helper-function'

const pieChartChartConfigGenerator = (
  majorExpense: MajorExpenseCategory[]
): ChartConfig => {
  const chartConfig: ChartConfig = {}
  majorExpense.map((expense, idx) => {
    chartConfig[convertStringToCamelCase(expense.category)] = {
      label: expense.category,
      color: `hsl(var(--chart-${idx + 1}))`
    }
  })

  return chartConfig
}

const chartDataGenerator = (majorExpenses: MajorExpenseCategory[]) => {
  if (!majorExpenses) return []
  return majorExpenses.map((expense, index) => {
    const key = convertStringToCamelCase(expense.category)
    console.log('key', key)

    return {
      ...expense,
      category: key,
      fill: `var(--color-${key})`
    }
  })
}

export function BarChartWithLabel({
  title,
  description,
  chartData,
  footer,
  chartConfig,
  hideTooltipLabel = false
}: {
  title: string | ReactNode
  description: string | ReactNode
  chartData: { [key: string]: string | number }[]
  footer?: {
    footerTitle: string | ReactNode
    footerDescription: string | ReactNode
  }
  chartConfig: ChartConfig
  hideTooltipLabel?: boolean
}) {
  return (
    <Card className='min-h-full min-w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={hideTooltipLabel} />}
            />
            <Bar dataKey='cost' fill='hsl(var(--chart-1))' radius={8}>
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            {footer.footerTitle} <TrendingUp className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            {footer.footerDescription}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export default function MajorExpensesChart({
  car,
  costAnalysis
}: CostAnalysisCharts) {
  const { majorExpenseCategories } = costAnalysis
  const chartData = chartDataGenerator(majorExpenseCategories)

  const chartConfig = pieChartChartConfigGenerator(majorExpenseCategories)

  const totalMajorCosts = majorExpenseCategories.reduce((acc, instance) => {
    return acc + instance.cost
  }, 0)

  console.log('total major costs', totalMajorCosts)

  return (
    // <BarChartWithLabel
    //   title={'Major Annual Cost Projection'}
    //   description={''}
    //   chartData={costAnalysis?.majorExpenseCategories || []}
    //   chartConfig={chartConfig}
    // />

    <MyPieChart
      title='Major Annual Cost Projection'
      description=''
      chartData={chartData}
      chartConfig={chartConfig}
      pieChartCenterMessage={{
        title: `${totalMajorCosts} €`, 
        description: "In Major Costs"
      }}
    />
  )
}
