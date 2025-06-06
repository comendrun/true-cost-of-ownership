import { z } from 'zod'

const UserCarsTableRowSchema = z.object({
  average_fuel_cost: z.number(),
  depreciation_rate: z.number(),
  eco_tax: z.number(),
  emissions: z.number(),
  estimated_resale_value: z.number(),
  extended_warranty_cost: z.number(),
  fuel_consumption: z.number(),
  guarantee_years: z.number(),
  insurance_cost: z.number(),
  maintenance_frequency: z.string(),
  name: z.string(),
  offer_on_extended_warranty: z.boolean(),
  oil_change_costs: z.number(),
  parking_costs: z.number(),
  regular_maintenance_costs: z.number(),
  remaining_amount: z.number(),
  resale_value_after_years: z.number(),
  service_costs: z.number(),
  service_includes: z.string(),
  taxes: z.number(),
  tco: z.number(),
  tires_costs: z.number(),
  total_interest_paid: z.number(),
  total_planned_kms: z.number(),
  true_purchase_price: z.number(),
  tuv_costs: z.number(),
  unexpected_repair_costs: z.number()
})

export const AIAnalysisMetricsSchema = z.object({
  costAnalysis: z.object({
    averageMonthlyCost: z.number(),
    annualCostProjection: z.array(
      z.object({
        year: z.number(),
        totalCost: z.number()
      })
    ),
    majorExpenseCategories: z.array(
      z.object({
        category: z.string(),
        cost: z.number()
      })
    )
  }),
  comparisonMetrics: z.array(
    z.object({
      carModel: z.string(),
      initialCost: z.number(),
      annualRunningCost: z.number(),
      depreciationRate: z.number(),
      fuelEfficiency: z.number(),
      resaleValue: z.number()
    })
  ),
  resaleValueInsights: z.array(
    z.object({
      carModel: z.string(),
      initialPrice: z.number(),
      yearsToDepreciate: z.number(),
      resaleValueProjections: z.array(
        z.object({
          year: z.number(),
          resaleValue: z.number()
        })
      )
    })
  ),
  fuelEfficiency: z.array(
    z.object({
      carModel: z.string(),
      distanceDriven: z.object({
        monthly: z.number(),
        yearly: z.number()
      }),
      fuelEfficiency: z.number(),
      estimatedFuelCost: z.object({
        monthly: z.number(),
        yearly: z.number()
      })
    })
  )
})

export type AIAnalysisMetrics = z.infer<typeof AIAnalysisMetricsSchema>

export const ChatCompletionResponseFormatSchema = z
  .object({
    analysis_metrics: AIAnalysisMetricsSchema,
    analysis_summary: z.string(),
    cost_saving_opportunities: z.array(z.string()),
    feedback: z.string(),
    recommended_insurances: z.string(),
    response: z.string(),
    suggested_driving_tips: z.array(z.string())
  })
  .strict()

export type ChatCompletionResponseFormat = z.infer<
  typeof ChatCompletionResponseFormatSchema
>
