'use client'

import { Bar, BarChart, XAxis } from 'recharts'

import {
  ComparisonMetrics,
  UserCarsTableRow
} from '@/components/types/add-car/types'
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
import { TrendingUp } from 'lucide-react'
import { ReactNode } from 'react'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const comparisonMetricCategoryKeys: Array<keyof ComparisonMetrics[0]> = [
  'initialCost',
  'annualRunningCost',
  'depreciationRate',
  'fuelEfficiency',
  'resaleValue'
]

enum comparisonMetricCategoryLabels {
  carModel = 'Car Model',
  initialCost = 'Initial Cost',
  annualRunningCost = 'Annual Running Cost',
  depreciationRate = 'Depcreciation Rate',
  fuelEfficiency = 'Fuel Efficiency',
  resaleValue = 'Resale Value'
}

function generateMetricChartData(comparisonMetrics: ComparisonMetrics) {
  const chartData: { [key: string]: string | number }[] = []
  const firstCar = comparisonMetrics[0]
  const secondCar = comparisonMetrics[1]
  comparisonMetricCategoryKeys.map(metricKey => {
    const chartDatum = {
      category: metricKey,
      [firstCar.carModel.toLowerCase().trim().replace(/\s/g, '')]:
        firstCar[metricKey],
      [secondCar.carModel.toLowerCase().trim().replace(/\s/g, '')]:
        secondCar[metricKey],
    }

    chartData.push(chartDatum)
  })
  return chartData
}

function generateComparisonMetricsChartConfig(
  comparisonMetrics: ComparisonMetrics
): ChartConfig {
  const firstCar = comparisonMetrics[0]
  const secondCar = comparisonMetrics[1]

  const chartConfig: ChartConfig = {
    [firstCar.carModel.toLowerCase().trim().replace(/\s/g, '')]: {
      label: firstCar.carModel,
      color: 'hsl(var(--chart-1))'
    },
    [secondCar.carModel.toLowerCase().trim().replace(/\s/g, '')]: {
      label: secondCar.carModel,
      color: 'hsl(var(--chart-2))'
    }
  }

  return chartConfig
}

// Define which metrics should be reversed ("lower is better")
const reversedMetrics: { [key in keyof ComparisonMetrics[0]]?: boolean } = {
  initialCost: true,
  annualRunningCost: true,
  depreciationRate: true, // For depreciation, lower % is better
  fuelEfficiency: true,
  resaleValue: false // Higher is better, so standard normalization
}



export function RadarChartMultiple({
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
  const chartConfigkeys = Object.keys(chartConfig)
  return (
    <Card className='min-w-full min-h-full h-full'>
      <CardHeader className='items-center pb-4'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
              formatter={(value, name, props) => {
                const rawKey = `${name}_raw`;
                if (props.payload && rawKey in props.payload) {
                  return props.payload[rawKey].toLocaleString();
                }
                return value;
              }}
            //   formatter={value => {
            //     console.log('value in the formatter', value)
            //     return value
            //   }}
            //   labelFormatter={(label, payload) => {
            //     console.log('label and payload', label, payload)
            //     return <div><p>Hello</p></div>
            //   }}
            />
            <PolarAngleAxis dataKey='category' tickFormatter={value => value} />
            <PolarGrid />
            <Radar
              dataKey={chartConfigkeys[0]}
              fill={chartConfig[chartConfigkeys[0]].color}
              fillOpacity={0.6}
            />
            <Radar
              dataKey={chartConfigkeys[1]}
              fill={chartConfig[chartConfigkeys[1]].color}
              fillOpacity={0.6}
            />
          </RadarChart>
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

function generateNormalizedMetricChartData(comparisonMetrics: ComparisonMetrics) {
  const chartData: { [key: string]: string | number }[] = [];
  const [car1, car2] = comparisonMetrics;

  // Create unique keys for each car
  const carKey1 = car1.carModel.toLowerCase().trim().replace(/\s/g, '');
  const carKey2 = car2.carModel.toLowerCase().trim().replace(/\s/g, '');

  comparisonMetricCategoryKeys.forEach(metricKey => {
    const raw1 = car1[metricKey] as number;
    const raw2 = car2[metricKey] as number;

    // Apply normalization (and reverse if needed)
    // (Assume you have your normalization logic here; see previous examples)
    // For demonstration, let's assume norm1 and norm2 are computed values
    const norm1 = /* ... normalized value for car1 ... */ raw1; // replace with your computed value
    const norm2 = /* ... normalized value for car2 ... */ raw2; // replace with your computed value

    // Build a datum containing both normalized and raw values:
    const chartDatum = {
      category: metricKey,
      [carKey1]: norm1,
      [`${carKey1}_raw`]: raw1,
      [carKey2]: norm2,
      [`${carKey2}_raw`]: raw2
    };

    chartData.push(chartDatum);
  });

  return chartData;
}


export default function ComparisonMetricsChart({
  car,
  comparisonMetrics
}: {
  car: UserCarsTableRow
  comparisonMetrics: ComparisonMetrics
}) {
  console.log('comparisonMetrics', comparisonMetrics)

  const normalizedChartData =
  generateNormalizedMetricChartData(comparisonMetrics)

  console.log('metric chart data', generateMetricChartData(comparisonMetrics))

  const chartConfig = generateComparisonMetricsChartConfig(comparisonMetrics)

  console.log('chartConfig', chartConfig)

  return (
    <RadarChartMultiple
      title={'Major Annual Cost Projection'}
      description={''}
      chartData={normalizedChartData}
      chartConfig={chartConfig}
    />
  )
}

export function BarMultiComparisonChart({
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
  const chartConfigkeys = Object.keys(chartConfig)

  return (
    <Card className='min-h-full min-w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey={chartConfigkeys[0]}
              stackId='a'
              fill={chartConfig[chartConfigkeys[0]].color}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey={chartConfigkeys[1]}
              stackId='a'
              fill={chartConfig[chartConfigkeys[1]].color}
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel={hideTooltipLabel} />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            {footer.footerTitle}
          </div>
          <div className='leading-none text-muted-foreground'>
            {footer.footerDescription}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
