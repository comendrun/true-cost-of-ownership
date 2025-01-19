import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { z } from 'zod'

// Define the UserCarsTableRow structure
const UserCarsTableRowSchema = z.object({
  average_fuel_cost: z.number().nullable(),
  //   brand: z.string(),
  created_at: z.string().nullable(),
  depreciation_rate: z.number().nullable(),
  driver_age_range: z.string(),
  driving_experience_years: z.number(),
  eco_tax: z.number().nullable(),
  emissions: z.number().nullable(),
  estimated_resale_value: z.number().nullable(),
  extended_warranty_cost: z.number().nullable(),
  exterior_score: z.number().nullable(),
  financing_duration: z.number().nullable(),
  fuel_consumption: z.number().nullable(),
  //   fuel_type: z.string(),
  guarantee_years: z.number().nullable(),
  //   id: z.number(),
  initial_price: z.number().nullable(),
  insurance_cost: z.number().nullable(),
  //   insurance_type: z.string(),
  //   interest_rate: z.number().nullable(),
  //   interior_score: z.number().nullable(),
  //   last_ai_response_id: z.number().nullable(),
  maintenance_frequency: z.string().nullable(),
  //   mileage: z.number(),
  //   model: z.string(),
  name: z.string(),
  offer_on_extended_warranty: z.boolean().nullable(),
  oil_change_costs: z.number().nullable(),
  parking_costs: z.number().nullable(),
  //   planned_years_of_ownership: z.number(),
  //   prepayment: z.number(),
  //   purchase_price: z.number(),
  regular_maintenance_costs: z.number().nullable(),
  remaining_amount: z.number().nullable(),
  resale_value_after_years: z.number().nullable(),
  service_costs: z.number().nullable(),
  service_includes: z.string().nullable(),
  taxes: z.number().nullable(),
  tco: z.number().nullable(),
  tires_costs: z.number().nullable(),
  total_interest_paid: z.number().nullable(),
  total_planned_kms: z.number(),
  true_purchase_price: z.number().nullable(),
  tuv_costs: z.number().nullable(),
  unexpected_repair_costs: z.number().nullable(),
  updated_at: z.string().nullable(),
  //   user_id: z.string().nullable(),
  variant: z.string().nullable(),
  version: z.number().nullable()
  //   year: z.number()
})

// Define the Zod schema for AIAnalysisMetrics
export const AIAnalysisMetricsSchema = z.object({
  userCar: UserCarsTableRowSchema,
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
  environmentalImpact: z.array(
    z.object({
      carModel: z.string(),
      yearlyCO2Emissions: z.number(),
      fuelType: z.enum(['petrol', 'diesel', 'electric', 'hybrid']),
      lifecycleImpact: z.object({
        production: z.number(),
        usePhase: z.number(),
        recycling: z.number()
      })
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
  loanAffordability: z.object({
    loanAmount: z.number(),
    interestRate: z.number(),
    loanTerm: z.number(),
    monthlyPayment: z.number(),
    totalInterest: z.number(),
    totalCost: z.number(),
    feedback: z.string()
  }),
  locationSpecificCosts: z.object({
    country: z.string(),
    averageFuelCost: z.number(),
    insuranceRange: z.object({
      min: z.number(),
      max: z.number()
    }),
    maintenanceCosts: z.array(
      z.object({
        type: z.string(),
        averageCost: z.number()
      })
    ),
    roadTaxes: z.number()
  }),
  maintenanceSchedule: z.array(
    z.object({
      carModel: z.string(),
      schedule: z.array(
        z.object({
          mileage: z.number(),
          tasks: z.array(z.string()),
          cost: z.number()
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

// TypeScript type from the schema
export type AIAnalysisMetrics = z.infer<typeof AIAnalysisMetricsSchema>
