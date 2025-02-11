import { Database } from '@/database.types'
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
  FieldValues,
  Path,
  ControllerRenderProps
} from 'react-hook-form'
import { z } from 'zod'
import { ChatCompletionResponseFormat } from '../../my-cars/functions/openai/analysis-response-schema'

export const CarFormSchema = z.object({
  // General Information
  name: z.string().nullable().optional(),
  brand: z
    .string()
    .min(1, { message: 'Please select a car brand from the list.' }),
  model: z
    .string()
    .min(1, { message: 'Please select a car model from the list.' }),
  variant: z.string().nullable().optional(),
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
    .nullable()
    .optional(),
  exteriorScore: z
    .number()
    .min(-5, 'Value must be at least -5')
    .max(5, 'Value must be at most 5')
    .nullable()
    .optional(),
  // Finances
  purchasePrice: z.number(), // euros
  prepayment: z.number(), // euros
  interestRate: z.number().nullable().optional(), // percentage
  financingDuration: z.number().max(10).nullable().optional(), // years
  remainingAmount: z.number().nullable().optional(), // euros
  totalInterestPaid: z.number().nullable().optional(),
  truePurchasePrice: z.number().nullable().optional(),

  // Depreciation
  initialPrice: z.number().nullable().optional(), // euros // the initial price of the vehicle when it was first sold as new
  depreciationRate: z.number().nullable().optional(), // percentage

  // Warranty and Service
  guaranteeYears: z
    .number()
    .min(0, { message: "The Guaranteed years can't be less than 0" })
    .nullable()
    .optional(), // years
  serviceCosts: z.number().nullable().optional(), // euros - this is done annually and regardless of any repairs are due to be paid.
  serviceIncludes: z.string().nullable().optional(), // list of the services
  tiresCosts: z.number().nullable().optional(), // euros, probably similar for different cars
  oilChangeCosts: z.number().nullable().optional(), // euros, as an example of the costs associated to the car
  offerOnExtendedWarranty: z.boolean().nullable().optional(),
  extendedWarrantyCost: z.number().nullable().optional(),

  // Efficiency
  totalPlannedKMs: z.number(), // KMs, total number of KMs planned to drive the car yearly
  fuelConsumption: z.number().nullable().optional(), // liters per 100KM
  fuelType: z.enum([
    'Diesel',
    'Petrol',
    'Hybrid/Diesel',
    'Hybrid/Petrol',
    'Electric'
  ]),
  averageFuelCost: z.number().nullable().optional(),

  // Insurance
  insuranceType: z.enum(['Minimum', 'Partial', 'Full']),
  insuranceCost: z.number().nullable().optional(), // euros, depends on the car

  // Other Costs
  tuvCosts: z.number().nullable().optional(), // euros, probably similar for different cars
  taxes: z.number().nullable().optional(), // yearly
  parkingCosts: z.number().nullable().optional(),

  // Resale Value
  estimatedResaleValue: z.number().nullable().optional(),
  resaleValueAfterYears: z.number().nullable().optional(),

  // Maintenance
  regularMaintenanceCosts: z.number().nullable().optional(),
  unexpectedRepairCosts: z.number().nullable().optional(),
  maintenanceFrequency: z.string().nullable().optional(),

  // Environmental Impact
  emissions: z.number().nullable().optional(),
  ecoTax: z.number().nullable().optional(),

  // Total Cost of Ownership
  tco: z.number().nullable().optional()
})

export type CarFormFields = z.infer<typeof CarFormSchema>

export const CarFormSchemaOptional = CarFormSchema.partial()

export type OptionalAllCarFormFields = z.infer<typeof CarFormSchemaOptional>

export const CarFormOptionalFieldsSchema = CarFormSchema.pick({
  name: true,
  interestRate: true,
  financingDuration: true,
  remainingAmount: true,
  totalInterestPaid: true,
  truePurchasePrice: true,
  initialPrice: true,
  depreciationRate: true,
  // guaranteeYears: true,
  serviceCosts: true,
  serviceIncludes: true,
  tiresCosts: true,
  oilChangeCosts: true,
  fuelConsumption: true,
  averageFuelCost: true,
  insuranceCost: true,
  tuvCosts: true,
  taxes: true,
  parkingCosts: true,
  estimatedResaleValue: true,
  // resaleValueAfterYears: true,
  regularMaintenanceCosts: true,
  unexpectedRepairCosts: true,
  maintenanceFrequency: true,
  emissions: true,
  ecoTax: true,
  tco: true
}).extend({
  financingDuration: z.number().optional()
  // guaranteeYears: z.number().optional()
})

export type CarFormOptionalFields = z.infer<typeof CarFormOptionalFieldsSchema>

type BaseField<TFieldValues> = {
  key: Path<TFieldValues> // Keys of the provided form fields type
  type: 'string' | 'number' | 'boolean' // Type of the returned value
  required: boolean
  label: string
  disabled?: boolean
  formDescription?: string
  infoField?: boolean
  placeholder?: string
  fullWidth?: boolean
}

export type InputField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'input'
  inputSuffix?: string
}

export type SelectField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'select'
  placeholder?: string
  selectItems:
    | string[]
    | ((arg1: TFieldValues) => string[] | number[] | undefined)
}

export type TextareaField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'textarea'
  placeholder?: string
}

export type CheckboxField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'checkbox'
}

export type FormFieldType<TFieldValues> =
  | InputField<TFieldValues>
  | SelectField<TFieldValues>
  | TextareaField<TFieldValues>
  | CheckboxField<TFieldValues>

export type FormSteps<TFieldValues> = {
  id: FormStepsIDs
  index: number
  title: string
  fields: FormFieldType<TFieldValues>[]
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

// export type AIAnalysisChatCompletionResponse = ChatCompletionResponseFormat

export type CarFormValuesKeys = keyof CarFormFields

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
  keyof CarFormFields,
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
  keyof CarFormFields
> = Object.fromEntries(
  Object.entries(userCarFormToTableKeyMapping).map(([formKey, dbKey]) => [
    dbKey,
    formKey
  ])
) as Record<keyof UserCarsTableRow, keyof CarFormFields>

export type FormFieldComponentsProps<TFieldValues extends FieldValues> = {
  index: number
  isCarLoading: boolean
  fields: FormFieldType<TFieldValues>[]
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  id: string | number | null
  watch: UseFormWatch<TFieldValues>
}

export type SavedCarAIResponseComponentsProps = {
  optionalCarFormValues: CarFormOptionalFields | null
  isSavingCarInProgress: boolean
  setIsSavingCarInProgress?: (boolValue: boolean) => void
  updateOptionalCarFormValues: (values: CarFormOptionalFields | null) => void
  id: string | number
  updateCarFormValues: (values: CarFormFields) => void
  carFormValues: CarFormFields | null
  triggerFetch?: () => void
}

export type AIResponseFormFieldProps = {
  formField: FormFieldType<CarFormOptionalFields>
  control: Control<CarFormOptionalFields>
  errors: FieldErrors
  watch: UseFormWatch<CarFormOptionalFields>
}

export type AIResponseFormFieldInputProps = Pick<
  AIResponseFormFieldProps,
  'formField' | 'control' | 'errors' | 'watch'
> & { field: ControllerRenderProps<CarFormOptionalFields>; isEditting: boolean }
