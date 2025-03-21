import { UserCarsTableRow } from '@/types/db.types'

export type CostAnalysisCharts = {
  car: UserCarsTableRow
  costAnalysis: CostAnalysis
}

export type AIAnalysisMetrics = {
  costAnalysis: CostAnalysis
  fuelEfficiency: FuelEfficiency
  comparisonMetrics: ComparisonMetrics
  loanAffordability: LoanAffordability
  environmentalImpact: EnvironmentalImpact
  maintenanceSchedule: MaintenanceSchedule
  resaleValueInsights: ResaleValueInsights
  locationSpecificCosts: LocationSpecificCosts
}

export type CostAnalysis = {
  averageMonthlyCost: number // Average monthly cost in EUR
  annualCostProjection: { year: number; totalCost: number }[] // Projected yearly costs
  majorExpenseCategories: MajorExpenseCategory[] // Breakdown of major expenses
}

export type MajorExpenseCategory = { category: string; cost: number }

export type ComparisonMetrics = {
  carModel: string
  initialCost: number // Purchase price in EUR
  annualRunningCost: number // Annual running costs
  depreciationRate: number // Depreciation rate as a percentage
  fuelEfficiency: number // Liters per 100 km or MPG
  resaleValue: number // Projected resale value after X years
}[]

export type EnvironmentalImpact = {
  carModel: string
  yearlyCO2Emissions: number // in kilograms
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  lifecycleImpact: { production: number; usePhase: number; recycling: number } // CO2 in kg
}[]

export type ResaleValueInsights = {
  carModel: string
  initialPrice: number
  yearsToDepreciate: number // Years to lose X% of value
  resaleValueProjections: { year: number; resaleValue: number }[] // Resale values over time
}[]

export type LoanAffordability = {
  loanAmount: number // Amount financed in EUR
  interestRate: number // Annual interest rate in %
  loanTerm: number // Term in years
  monthlyPayment: number // Monthly payment amount in EUR
  totalInterest: number // Total interest paid over the loan
  totalCost: number // Total cost of the car (loan + interest)
}

export type LocationSpecificCosts = {
  country: string
  averageFuelCost: number // Cost per liter in EUR
  insuranceRange: { min: number; max: number } // Monthly insurance in EUR
  maintenanceCosts: { type: string; averageCost: number }[] // Average maintenance costs
  roadTaxes: number // Annual road tax in EUR
}

export type UsageScenarios = {
  scenario: string // e.g., "family trips," "city driving," "off-road"
  recommendedCars: { carModel: string; reasons: string[] }[] // Cars suitable for the scenario
  estimatedCosts: { type: string; cost: number }[] // Costs for this use case
}[]

export type MaintenanceSchedule = {
  carModel: string
  schedule: { mileage: number; tasks: string[]; cost: number }[] // Maintenance tasks by mileage
}[]

export type FuelEfficiency = {
  carModel: string
  distanceDriven: { monthly: number; yearly: number } // in km
  fuelEfficiency: number // Liters per 100 km
  estimatedFuelCost: { monthly: number; yearly: number } // in EUR
}[]
