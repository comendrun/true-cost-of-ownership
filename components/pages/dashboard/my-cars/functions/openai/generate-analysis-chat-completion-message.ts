import { User } from '@supabase/supabase-js'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

import { defaultCarFormValues } from '@/data/consts'
import { UserCarsTableRow } from '../../../add-car/types/types'
import { ChatCompletionResponseFormat } from './analysis-response-schema'

export const exampleData = {
  costAnalysis: {
    _comment:
      '// this is used to show the users an overview of the analysis of the car they are trying to analyze',
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
    },
    '_comment: "// here we will give another car in the same price range as an example and will compare the new car with the car that user has provided in terms of costs and etc"'
  ],

  environmentalImpact: [
    '_comment: // here we also bring another car in the same range to compare their enviromental impact',
    {
      carModel: 'Toyota Corolla',
      yearlyCO2Emissions: 2000,
      fuelType: 'petrol',
      lifecycleImpact: { production: 5000, usePhase: 12000, recycling: 1000 }
    },
    {
      carModel: 'Volkswagen Golf',
      yearlyCO2Emissions: 2200,
      fuelType: 'diesel',
      lifecycleImpact: { production: 5500, usePhase: 13000, recycling: 1100 }
    }
  ],

  resaleValueInsights: [
    '_comment: // here we want the ai to estimate the resalve value of the car in the upcoming years based on the data that it has on its own',
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

  loanAffordability: {
    _comment:
      'Here we will try to explain to the user how good of a deal their loan is and if its in range with what is being offered in the market',
    loanAmount: 6000,
    interestRate: 8,
    loanTerm: 4,
    monthlyPayment: 146,
    totalInterest: 1008,
    totalCost: 7008,
    feedback: 'SOME INFORMATION'
  },

  locationSpecificCosts: {
    country: 'Germany',
    averageFuelCost: 1.8,
    insuranceRange: { min: 50, max: 120 },
    maintenanceCosts: [
      { type: 'Oil change', averageCost: 100 },
      { type: 'Tire replacement', averageCost: 300 }
    ],
    roadTaxes: 200
  },

  maintenanceSchedule: [
    '_comment:here we will also compare the car with another car in the same range in terms of maintenance costs',

    {
      carModel: 'Toyota Corolla',
      schedule: [
        { mileage: 15000, tasks: ['Oil change', 'Tire rotation'], cost: 150 },
        { mileage: 30000, tasks: ['Brake pads', 'Engine check'], cost: 400 }
      ]
    },
    {
      carModel: 'Volkswagen Golf',
      schedule: [
        {
          mileage: 15000,
          tasks: ['Oil change', 'Filter replacement'],
          cost: 180
        },
        { mileage: 30000, tasks: ['Brake pads', 'Tire replacement'], cost: 500 }
      ]
    }
  ],

  fuelEfficiency: [
    '_comment:here we will also compare the car with another car in the same range in terms of fuel efficiency',

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
const examplePayloadWithClarifications: ChatCompletionResponseFormat = {
  // userCar: {
  //   // @ts-expect-error: the _comment property doesnt exist in the userCar but we need it to give the ai some comments on what to do. ToDo: remove these _comments and add the description in the messages directly
  //   _comment:
  //     'Here we will have all the car fields including the ones that were empty and now filled by AI.'
  // },
  analysis_metrics: JSON.stringify(exampleData), // this is the place
  analysis_summary:
    'This car is highly fuel-efficient and cost-effective for urban usage but may not perform well for long-distance travel due to limited space.',
  cost_saving_opportunities: [
    'Switch to a cheaper insurance provider',
    'Perform regular maintenance to avoid unexpected repair costs'
  ],
  feedback:
    'The overall specs and the performance ratio of the car look above medium, But there can be better options in the same price range like: VW Golf',
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
  You are a highly advanced assistant responsible for analyzing car-related data. Your task is to enhance incomplete user-provided data in a structured way, calculate missing fields, and provide meaningful analysis. Use the following schemas and examples as guidelines:
  
  ### Input Data
  - User-provided car details, stored in the \`user_cars\` table.
  - Relevant fields include:
    - **General Information:** name, brand, model, variant, year, mileage.
    - **Finances:** purchasePrice, prepayment, interestRate, financingDuration, remainingAmount, totalInterestPaid, truePurchasePrice.
    - **Depreciation:** initialPrice, depreciationRate.
    - **Warranty and Service:** guaranteeYears, serviceCosts, serviceIncludes, extendedWarrantyCost.
    - **Efficiency:** totalPlannedKMs, fuelConsumption, fuelType, averageFuelCost.
    - **Insurance:** insuranceType, insuranceCost.
    - **Environmental Impact:** emissions, ecoTax.
    - **Other Costs:** taxes, parkingCosts, tuvCosts.
  
  ### Task
  1. **Fill Empty Fields:** Complete missing fields like \`name\` (e.g., "Toyota Corolla 2020") and calculate derived values (e.g., \`remainingAmount\`, \`totalInterestPaid\`).
  2. **Validate Inputs:** Identify potential inconsistencies in user inputs and include them in the feedback section without modifying original data.
  3. **Generate Analysis:** Provide:
     - Cost Analysis: Calculate average monthly costs, yearly projections, and major expense categories. This should be realistic and comply with the rest of the categories and costs, especially to the overal tco that is going to be stored in the userCar, and will be the total amount of costs for the car for the duration of the ownership.
     - Depreciation Insights: Predict resale value and depreciation over time.
     - Environmental Impact: Analyze emissions and lifecycle CO2.
     - Maintenance Schedule: Recommend tasks based on mileage.
     - Usage Scenarios: Suggest cars for specific use cases with cost estimates.
  
  ### Examples
  - **Missing Field Handling:**
    - Input: { name: null, brand: "Toyota", model: "Corolla", year: 2020 }
    - Output: { name: "Toyota Corolla 2020", ...other fields calculated }
  - **Cost Analysis Example:**
    - Input: { purchasePrice: 25000, interestRate: 5, financingDuration: 4 }
    - Output: { averageMonthlyCost: 600, annualCostProjection: [{ year: 1, totalCost: 7200 }, ...] }

  ### Important: Please take a note that the tco field in the userCar is very important for me and I need it to be filled with the total
  amount of the costs of the car over the next few years (based on the userCar.planned_years_of_ownership( ${userCar.planned_years_of_ownership} )value) considering all other costs combined (loan, interest, tuv, taxes, etc)
  Also if you are going to for example generate the costAnalysis for the analysis_metrics, then please take the tco value and also the planned_years_of_ownership into consideration. if planned_years_of_ownership is 5 then create cost analysis projection for 5 years!
  This was an example, overall i want you to be smart and generate these values as a package that are all connected together
  
  ### Guidelines
  - Adhere to the schemas provided in \`${defaultCarFormValues}\`.
  - Only calculate and suggest; do not alter user-provided inputs. Highlight discrepancies in the feedback section.
  - Return data in JSON format with relevant sections.

  ### Output Format: IMPORTANT: THE output Object format type definition examplePayloadWithClarifications:
  ${JSON.stringify(examplePayloadWithClarifications)}
  - Please stick strictly to the defined format for the output as I rely on this to parse and save the data after I got a response.

  ### Location and Costs: if the location is not provided, assume Germany as the location for the car and the costs and all the other costs that may be there
  
  \`\`\`
      `
    },
    {
      role: 'user',
      content: JSON.stringify(
        {
          userCar,
          user
        },
        null,
        2
      )
    }
  ]
}
