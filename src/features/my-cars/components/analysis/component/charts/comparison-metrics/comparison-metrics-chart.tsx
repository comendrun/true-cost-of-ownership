/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

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
  ChartTooltip
} from '@/components/ui/chart'
import { TrendingUp } from 'lucide-react'
import { ReactNode } from 'react'
import { TooltipProps } from 'recharts'

import { ComparisonMetrics } from '@/features/my-cars/types/analysis.types'
import { UserCarsTableRow } from '@/types/db.types'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const comparisonMetricCategoryKeys: Array<keyof ComparisonMetrics[0]> = [
  'initialCost',
  'annualRunningCost',
  'depreciationRate',
  'fuelEfficiency',
  'resaleValue'
]

const comparisonMetricCategoryLabels: { [key: string]: string } = {
  carModel: 'Car Model',
  initialCost: 'Initial Cost',
  annualRunningCost: 'Annual Running Cost',
  depreciationRate: 'Depcreciation Rate',
  fuelEfficiency: 'Fuel Efficiency',
  resaleValue: 'Resale Value'
}

function generateMetricChartData(comparisonMetrics: ComparisonMetrics) {
  const chartData: { [key: string]: string | number }[] = []

  const carModels = comparisonMetrics.map(car =>
    car.carModel.toLowerCase().trim().replace(/\s/g, '')
  )

  comparisonMetricCategoryKeys.forEach(metricKey => {
    const rawValues = comparisonMetrics.map(car => Number(car[metricKey]))

    const chartDatum: { [key: string]: string | number } = {
      category: metricKey,
      categoryLabel: comparisonMetricCategoryLabels[metricKey]
    }

    // Identify the best value (min if reversed, else max)
    const bestValue = reversedMetrics[metricKey]
      ? Math.min(...rawValues)
      : Math.max(...rawValues)

    comparisonMetrics.forEach(car => {
      const modelKey = car.carModel.toLowerCase().trim().replace(/\s/g, '')
      const raw = car[metricKey] as number

      const normalized = reversedMetrics[metricKey]
        ? bestValue / raw // smaller is better → 1 if it's the best (smallest)
        : raw / bestValue // bigger is better → 1 if it's the best (largest)

      chartDatum[modelKey] = +normalized.toFixed(3)
      chartDatum[`${modelKey}_raw`] = raw
    })

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
      color: 'hsl(var(--chart-4))'
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
                                     hideTooltipLabel = false,
                                     carNameDecoderMap
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
  carNameDecoderMap: Record<string, string>
}) {
  const chartConfigkeys = Object.keys(chartConfig)
  return (
    <Card className="h-full min-h-full min-w-full">
      <CardHeader className="items-center pb-4">
        <CardTitle className="mr-auto">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <RadarChart data={chartData} className="w-full">
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip carNameDecoderMap={carNameDecoderMap} />}
            />

            <PolarAngleAxis dataKey="category" tickFormatter={value =>
              comparisonMetricCategoryLabels[value]
            } />
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
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {footer.footerTitle} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            {footer.footerDescription}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export const CustomTooltip = ({
                                active,
                                payload,
                                label,
                                carNameDecoderMap
                              }: TooltipProps<any, any> & { carNameDecoderMap: Record<string, string> }) => {
  if (!active || !payload?.length) return null

  const firstItem = payload[0]
  const categoryLabel = firstItem?.payload?.categoryLabel || 'Category'

  return (
    <div className="flex flex-col gap-4 rounded-md border bg-background p-4 shadow-sm">
      {/* Top: category label only once */}
      <div className="mb-2 text-sm font-semibold text-foreground">
        {categoryLabel}
      </div>

      {/* Entries per car */}
      <div className="flex flex-col gap-2">
        {payload.map((entry, idx) => {
          const color = entry.color || 'currentColor'
          const name = decodeCarModelKey(entry.name || entry.dataKey || `Item ${idx}`, carNameDecoderMap)
          const rawKey = `${entry.dataKey}_raw`
          const rawValue = entry.payload?.[rawKey]

          const displayValue = formatDisplayValue(rawValue, entry?.dataKey)

          return (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium text-foreground">{name}</span>
              <span className="ml-auto text-muted-foreground">
                {displayValue}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function formatDisplayValue(
  rawValue: string | number,
  dataKey?: string | number
) {
  if (typeof dataKey !== 'string') return rawValue

  if (dataKey.includes('cost') || dataKey.includes('value')) {
    return `€${Number(rawValue).toLocaleString()}`
  }
  if (dataKey.includes('efficiency')) {
    return `${rawValue} km/l`
  }
  if (dataKey.includes('rate')) {
    return `${rawValue}%`
  }

  return rawValue
}

export default function ComparisonMetricsChart({
                                                 car,
                                                 comparisonMetrics
                                               }: {
  car: UserCarsTableRow
  comparisonMetrics: ComparisonMetrics
}) {
  const normalizedChartData = generateMetricChartData(comparisonMetrics)

  const chartConfig = generateComparisonMetricsChartConfig(comparisonMetrics)

  const carNameDecoderMap = createCarModelDecoder(comparisonMetrics)

  return (
    <RadarChartMultiple
      title="Annual Cost Analysis"
      description={''}
      chartData={normalizedChartData}
      chartConfig={chartConfig}
      carNameDecoderMap={carNameDecoderMap}
    />
  )
}

export function encodeCarModelName(carModel: string): string {
  return carModel.toLowerCase().trim().replace(/\s+/g, '')
}

export function createCarModelDecoder(
  comparisonMetrics: ComparisonMetrics
): Record<string, string> {
  const map: Record<string, string> = {}
  comparisonMetrics.forEach(car => {
    const key = encodeCarModelName(car.carModel)
    map[key] = car.carModel
  })
  return map
}

export function decodeCarModelKey(
  key: string,
  decoderMap: Record<string, string>
): string {
  return decoderMap[key] ?? key // fallback if not found
}
