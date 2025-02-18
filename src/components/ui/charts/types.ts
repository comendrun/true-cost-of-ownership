import { ReactNode } from 'react'
import { ChartConfig } from '../chart'

export type ChartProps = {
  title: string | ReactNode
  description: string | ReactNode
  chartData: { [key: string]: string | number }[]
  footer?: {
    title?: string | ReactNode
    description?: string | ReactNode
  }
  chartConfig: ChartConfig
  hideTooltipLabel?: boolean
  pieChartCenterMessage?: {
    title?: string | ReactNode
    description?: string | ReactNode
  }
}
