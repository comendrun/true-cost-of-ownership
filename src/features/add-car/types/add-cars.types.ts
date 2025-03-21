import { COUNTRIES } from '@/data/app.consts'
import { Database } from '@/types/database.types'
import { UserCarsTableRow } from '@/types/db.types'
import { FormFieldType } from '@/types/form-field.types'
import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import { z } from 'zod'

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
  tco: z.number().nullable().optional(),
  country: z.enum(COUNTRIES).default(COUNTRIES[0])
})

export type CarFormFields = z.infer<typeof CarFormSchema>

export type CarFormFieldsKeys = keyof CarFormFields

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

export type CarFormOptionalFieldsKeys = keyof CarFormOptionalFields

export type FormSteps<TFieldValues> = {
  id: FormStepsIDs
  index: number
  title: string
  fields: FormFieldType<TFieldValues>[]
}

export type FormStepsIDs =
  | 'essentialInfo'
  | 'financialOverview'
  | 'efficiencyConsumption'
  | 'maintenanceWarranty'
// | 'generalInfo'
// | 'finances'
// | 'depreciation'
// | 'warrantyAndService'
// | 'efficiency'
// | 'insurance'
// | 'otherCosts'
// | 'resaleValue'
// | 'maintenance'
// | 'personalPreferences'
// | 'environmentalImpact'
// | 'totalCostOfOwnership'

export type CarFormValuesKeys = keyof CarFormFields

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
  tco: 'tco',
  country: 'country'
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
