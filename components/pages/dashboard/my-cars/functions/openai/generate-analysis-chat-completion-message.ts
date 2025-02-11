import { User } from '@supabase/supabase-js'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

import { defaultCarFormValues } from '@/data/consts'
import { UserCarsTableRow } from '../../../add-car/types/types'
import {
  AIAnalysisMetrics,
  ChatCompletionResponseFormat
} from './analysis-response-schema'

export const exampleAnalysisMetricsData: AIAnalysisMetrics = {
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
      fuelEfficiency: 5.6, // Liters per 100 km
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
}

// Example Payload for AI Model
const exampleResponse: ChatCompletionResponseFormat = {
  analysis_metrics: exampleAnalysisMetricsData, // this is the place
  analysis_summary:
    'This car is highly fuel-efficient and cost-effective for urban usage but may not perform well for long-distance travel due to limited space.',
  cost_saving_opportunities: [
    'Switch to a cheaper insurance provider',
    'Perform regular maintenance to avoid unexpected repair costs'
  ],
  feedback:
    'The overall specs and the performance ratio of the car look above average, But there can be better options in the same price range like: VW Golf',
  recommended_insurances:
    "We recommend a full coverage as it's very important for a 3 years old car to have full coverage to prevent any mass loss of value.",
  response:
    'Based on your preferences, we recommend the Toyota Corolla Hybrid for its excellent fuel efficiency and low maintenance costs.',
  suggested_driving_tips: [
    'Avoid aggressive acceleration to improve fuel efficiency',
    'Schedule regular tire rotations to extend tire lifespan'
  ]
}

export function generateOpenAIAnalysisChatCompletionMessage(
  userCar: UserCarsTableRow,
  user: User
): ChatCompletionMessageParam[] {
  return [
    {
      role: 'system',
      content: `
      you are an expert in Cars and car information and car value and cost determination.
      I need you to get the information that our user and also our AI agent filled for specific cars, and turn them into valuable and sensible analysis 
      format so that we can help our users to make wiser decisions about their choices and their future.
      as an example or as a sample of what I expect to get in return.

        analysis_metrics: z.object({
          - costAnalysis: in this category I want you to get the following tco (${userCar.tco}) that is expected by us for this car over the span of the following (${userCar.planned_years_of_ownership}) years, and give us a cost prediction for each of the following years, and that how much it would cost on each year for the owner. plus in majorExpenseCategories we want you to divide the major possible costs of the owner for this car, considering its TCO plus other costs and specs of the car that are provided to you (Per Year). Please make a wise and expert analysis of this. obviously in this case the total expenses predicted for the duration of the ownership should be logical and in paar with the TCO value and other values.
          
          - comparisonMetrics: 

          - resaleValueInsights: in this case, i want you to take the overall values and costs of the car, and based on the estimated resale values of the car which we predicted (${userCar.estimated_resale_value}), and initial predicted price (${userCar.initial_price}) and the number of ownership years (${userCar.planned_years_of_ownership}), project a resale value for the car for the duration of the ownership, per year.

          - fuelEfficiency:  here in this case I expect you to give an example of a similar car in the same price range and same class range with the current car (${userCar.brand} - ${userCar.model} - ${userCar.variant} - ${userCar.year} - ${userCar.fuel_type} - ${userCar.fuel_consumption}) and compare their fuel efficiency and their performance in an array. I dont need a definiton or a string or anything, just numbers and the coparison is enough.
        }),
        analysis_summary: z.string(), A summary or a brief opinion of you as an expert about the car and it's specs and pricing.
        cost_saving_opportunities: z.array(z.string()), in an array, give some advices to the users about how they can save costs in case they own or plan to buy this car.
        feedback: z.string(), a feedback about overall qualities and specs of the car and if its a good idea to actually go on and buy this car. or consider other options or make wiser moves, etc
        recommended_insurances: z.string(), for example in case the car is still young, then it makes more sense to buy a full comprehensive insurance plan, otherwise of course it makes more sense to only buy obligatory insrurance and save on the extra costs of the full coverage insurance plan.
        response: z.string(), what is about this car that sets it apart? and why it might be good option or a bad option. in one sentence.
        suggested_driving_tips: z.array(z.string()), suggest and recommend a couple of points as an array of strings to the user so that they can drive this car in the best way possible. and get the most out of it.


        you can see an example of what I expect here: (${JSON.stringify(exampleResponse)})


  \`\`\`
      `
    },
    {
      role: 'user',
      content: `
      Please consider the following car information to complete and generate the requested prompt by the system role:
      data: ${JSON.stringify(
        {
          userCar
        },
        null,
        2
      )}`
    }
  ]
}
