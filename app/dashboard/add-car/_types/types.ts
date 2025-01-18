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

export type CarFormValuesKeys = keyof CarFormValues
