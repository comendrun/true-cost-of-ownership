import { User } from '@supabase/supabase-js'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import {
  AIAnalysisMetrics,
  ChatCompletionResponseFormat
} from './analysis-response-schema'
import { UserCarsTableRow } from '@/components/types/add-car/types'

// Example response structure (for reference)
export const exampleResponse: ChatCompletionResponseFormat = {
  analysis_metrics: {
    costAnalysis: {
      averageMonthlyCost: 250,
      annualCostProjection: [
        { year: 2024, totalCost: 3000 },
        { year: 2025, totalCost: 3200 }
      ],
      majorExpenseCategories: [
        { category: 'Fuel', cost: 1200 },
        { category: 'Insurance', cost: 600 },
        { category: 'Maintenance', cost: 400 }
      ]
    },
    comparisonMetrics: [
      {
        carModel: 'Toyota Corolla',
        initialCost: 12000,
        annualRunningCost: 3000,
        depreciationRate: 10,
        fuelEfficiency: 5.6,
        resaleValue: 8000
      },
      {
        carModel: 'Volkswagen Golf',
        initialCost: 15000,
        annualRunningCost: 3200,
        depreciationRate: 12,
        fuelEfficiency: 6.0,
        resaleValue: 8500
      }
    ],
    resaleValueInsights: [
      {
        carModel: 'Toyota Corolla',
        initialPrice: 12000,
        yearsToDepreciate: 5,
        resaleValueProjections: [
          { year: 2025, resaleValue: 10000 },
          { year: 2030, resaleValue: 6000 }
        ]
      },
      {
        carModel: 'Volkswagen Golf',
        initialPrice: 15000,
        yearsToDepreciate: 5,
        resaleValueProjections: [
          { year: 2025, resaleValue: 12500 },
          { year: 2030, resaleValue: 7500 }
        ]
      }
    ],
    fuelEfficiency: [
      {
        carModel: 'Toyota Corolla',
        distanceDriven: { monthly: 1500, yearly: 18000 },
        fuelEfficiency: 5.6,
        estimatedFuelCost: { monthly: 151, yearly: 1812 }
      },
      {
        carModel: 'Volkswagen Golf',
        distanceDriven: { monthly: 1500, yearly: 18000 },
        fuelEfficiency: 6.0,
        estimatedFuelCost: { monthly: 162, yearly: 1944 }
      }
    ]
  },
  analysis_summary:
    'This car is highly fuel-efficient and cost-effective for urban usage but may not perform well for long-distance travel due to limited space.',
  cost_saving_opportunities: [
    'Switch to a cheaper insurance provider',
    'Perform regular maintenance to avoid unexpected repair costs'
  ],
  feedback:
    'The overall specs and performance ratio of the car are above average, though alternative options like VW Golf may be considered.',
  recommended_insurances:
    'We recommend full coverage for a 3-year-old car to safeguard against significant value loss.',
  response:
    'Based on your preferences, the Toyota Corolla Hybrid is an excellent option due to its fuel efficiency and low maintenance costs.',
  suggested_driving_tips: [
    'Avoid aggressive acceleration to improve fuel efficiency',
    'Schedule regular tire rotations to extend tire lifespan'
  ]
}

export function generateOpenAIAnalysisChatCompletionMessage(
  userCar: UserCarsTableRow,
  user: User
): ChatCompletionMessageParam[] {
  // Consolidated system instructions: clear, concise, and structured.
  const systemInstruction = `
You are an expert in automotive analysis. Based on the provided car data, generate a comprehensive analysis that includes the following sections:

1. **analysis_metrics**:
   - **Cost Analysis**: Using the car's TCO (${userCar.tco}) over ${userCar.planned_years_of_ownership} years, create annual cost predictions with logical variations (e.g., increasing costs for older vehicles - the older car gets, the more costs and expenses) and break down major expenses (Fuel, Insurance, Maintenance).
   - **Comparison Metrics**: Provide numerical comparisons with similar vehicles (initial cost, annual running cost, depreciation rate, fuel efficiency, resale value).
   - **Resale Value Insights**: Project yearly resale values using the estimated resale value (${userCar.estimated_resale_value}), initial price (${userCar.initial_price}), and ownership duration.
   - **Fuel Efficiency**: Compare fuel efficiency with a similar car in the same class (details: ${userCar.brand} ${userCar.model} ${userCar.variant}, ${userCar.year}, ${userCar.fuel_type}, consumption: ${userCar.fuel_consumption}).

2. **analysis_summary**: Offer a concise expert summary evaluating the car's specs, pricing, and overall value proposition.
3. **cost_saving_opportunities**: List actionable tips for reducing ownership costs.
4. **feedback**: Provide expert feedback on the car's merits and potential alternatives.
5. **recommended_insurances**: Advise on the most suitable insurance options based on the car's age and condition.
6. **response**: In one sentence, highlight what sets this car apart.
7. **suggested_driving_tips**: Offer practical tips to maximize the car’s performance.

Example structure:
${JSON.stringify(exampleResponse, null, 2)}
`

  // User instruction with specific car data.
  const userInstruction = `
Please generate the analysis based on the following car information:
${JSON.stringify({ userCar }, null, 2)}
`

  return [
    { role: 'system', content: systemInstruction },
    { role: 'user', content: userInstruction }
  ]
}
