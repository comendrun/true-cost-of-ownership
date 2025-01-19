import { Database } from '@/database.types'
import { z } from 'zod'

export const carFormSchema = z.object({
  // General Information
  name: z.string().optional(),
  brand: z
    .string()
    .min(1, { message: 'Please select a car brand from the list.' }),
  model: z
    .string()
    .min(1, { message: 'Please select a car model from the list.' }),
  variant: z.string().optional(),
  year: z.number(),
  mileage: z.number(), // KM
  plannedYearsOfOwnership: z.number().min(1),
  drivingExperienceYears: z
    .number()
    .min(0, 'The years of experience cannot be negative.'),
  driverAgeRange: z.enum(['18-25', '25-35', '35-55', '55+']),
  // Personal Preferences
  interiorScore: z
    .number()
    .min(-5, 'Value must be at least -5')
    .max(5, 'Value must be at most 5')
    .optional(),
  exteriorScore: z
    .number()
    .min(-5, 'Value must be at least -5')
    .max(5, 'Value must be at most 5')
    .optional(),
  // Finances
  purchasePrice: z.number(), // euros
  prepayment: z.number(), // euros
  interestRate: z.number().optional(), // percentage
  financingDuration: z.number().max(10).optional(), // years
  remainingAmount: z.number().optional(), // euros
  totalInterestPaid: z.number().optional(),
  truePurchasePrice: z.number().optional(),

  // Depreciation
  initialPrice: z.number().optional(), // euros // the initial price of the vehicle when it was first sold as new
  depreciationRate: z.number().optional(), // percentage

  // Warranty and Service
  guaranteeYears: z
    .number()
    .min(0, { message: "The Guaranteed years can't be less than 0" })
    .optional(), // years
  serviceCosts: z.number().optional(), // euros - this is done annually and regardless of any repairs are due to be paid.
  serviceIncludes: z.string().optional(), // list of the services
  tiresCosts: z.number().optional(), // euros, probably similar for different cars
  oilChangeCosts: z.number().optional(), // euros, as an example of the costs associated to the car
  offerOnExtendedWarranty: z.boolean().optional(),
  extendedWarrantyCost: z.number().optional(),

  // Efficiency
  totalPlannedKMs: z.number(), // KMs, total number of KMs planned to drive the car yearly
  fuelConsumption: z.number().optional(), // liters per 100KM
  fuelType: z.enum([
    'Diesel',
    'Petrol',
    'Hybrid/Diesel',
    'Hybrid/Petrol',
    'Electric'
  ]),
  averageFuelCost: z.number().optional(),

  // Insurance
  insuranceType: z.enum(['Minimum', 'Partial', 'Full']),
  insuranceCost: z.number().optional(), // euros, depends on the car

  // Other Costs
  tuvCosts: z.number().optional(), // euros, probably similar for different cars
  taxes: z.number().optional(), // yearly
  parkingCosts: z.number().optional(),

  // Resale Value
  estimatedResaleValue: z.number().optional(),
  resaleValueAfterYears: z.number().optional(),

  // Maintenance
  regularMaintenanceCosts: z.number().optional(),
  unexpectedRepairCosts: z.number().optional(),
  maintenanceFrequency: z.string().optional(),

  // Environmental Impact
  emissions: z.number().optional(),
  ecoTax: z.number().optional(),

  // Total Cost of Ownership
  tco: z.number().optional()
})

export type CarFormValues = z.infer<typeof carFormSchema>

type BaseField = {
  key: keyof CarFormValues
  type: 'string' | 'number' | 'boolean' // type of the returned value
  required: boolean
  label: string
  disabled?: boolean
  formDescription?: string
  infoField?: boolean
  placeholder?: string
  fullWidth?: boolean
}

export type InputField = BaseField & {
  component: 'input'
  inputSuffix?: string
}

export type SelectField = BaseField & {
  component: 'select'
  placeholder?: string
  selectItems:
    | string[]
    | ((arg1: CarFormValues) => string[] | number[] | undefined)
}

export type TextareaField = BaseField & {
  component: 'textarea'
  placeholder?: string
}

export type CheckboxField = BaseField & {
  component: 'checkbox'
}

export type FormFieldType =
  | InputField
  | SelectField
  | TextareaField
  | CheckboxField

export type FormSteps = {
  id: FormStepsIDs
  index: number
  title: string
  fields: FormFieldType[]
}

export type FormStepsIDs =
  | 'generalInfo'
  | 'finances'
  | 'depreciation'
  | 'warrantyAndService'
  | 'efficiency'
  | 'insurance'
  | 'otherCosts'
  | 'resaleValue'
  | 'maintenance'
  | 'personalPreferences'
  | 'environmentalImpact'
  | 'totalCostOfOwnership'

export type UserCarsTableRow = Database['public']['Tables']['user_cars']['Row']

export type UserProfile = Database['public']['Tables']['profiles']['Row']

export type UserCarsTableInsert =
  Database['public']['Tables']['user_cars']['Insert']

export type UserCarsTableKeysRow = keyof UserCarsTableRow

export type UserCarsTableKeysInsert = keyof UserCarsTableInsert

export type AIResponseTableRow =
  Database['public']['Tables']['ai_responses']['Row']

export type AIResponseTableInsert =
  Database['public']['Tables']['ai_responses']['Insert']

export type AIAnalysisChatCompletionResponse = AIResponseTableInsert & {
  userCar: UserCarsTableRow
}

export type CarFormValuesKeys = keyof CarFormValues

// AI Generated Types:
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
  majorExpenseCategories: { category: string; cost: number }[] // Breakdown of major expenses
}

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

export const userCarFormToTableKeyMapping: Record<
  keyof CarFormValues,
  keyof UserCarsTableRow
> = {
  name: 'name',
  brand: 'brand',
  model: 'model',
  variant: 'variant',
  year: 'year',
  mileage: 'mileage',
  plannedYearsOfOwnership: 'planned_years_of_ownership',
  drivingExperienceYears: 'driving_experience_years',
  driverAgeRange: 'driver_age_range',
  interiorScore: 'interior_score',
  exteriorScore: 'exterior_score',
  purchasePrice: 'purchase_price',
  prepayment: 'prepayment',
  interestRate: 'interest_rate',
  financingDuration: 'financing_duration',
  remainingAmount: 'remaining_amount',
  totalInterestPaid: 'total_interest_paid',
  truePurchasePrice: 'true_purchase_price',
  initialPrice: 'initial_price',
  depreciationRate: 'depreciation_rate',
  guaranteeYears: 'guarantee_years',
  serviceCosts: 'service_costs',
  serviceIncludes: 'service_includes',
  tiresCosts: 'tires_costs',
  oilChangeCosts: 'oil_change_costs',
  offerOnExtendedWarranty: 'offer_on_extended_warranty',
  extendedWarrantyCost: 'extended_warranty_cost',
  totalPlannedKMs: 'total_planned_kms',
  fuelConsumption: 'fuel_consumption',
  fuelType: 'fuel_type',
  averageFuelCost: 'average_fuel_cost',
  insuranceType: 'insurance_type',
  insuranceCost: 'insurance_cost',
  tuvCosts: 'tuv_costs',
  taxes: 'taxes',
  parkingCosts: 'parking_costs',
  estimatedResaleValue: 'estimated_resale_value',
  resaleValueAfterYears: 'resale_value_after_years',
  regularMaintenanceCosts: 'regular_maintenance_costs',
  unexpectedRepairCosts: 'unexpected_repair_costs',
  maintenanceFrequency: 'maintenance_frequency',
  emissions: 'emissions',
  ecoTax: 'eco_tax',
  tco: 'tco'
}

export const userCarTableToFormKeyMapping: Record<
  keyof UserCarsTableRow,
  keyof CarFormValues
> = Object.fromEntries(
  Object.entries(userCarFormToTableKeyMapping).map(([formKey, dbKey]) => [
    dbKey,
    formKey
  ])
) as Record<keyof UserCarsTableRow, keyof CarFormValues>
