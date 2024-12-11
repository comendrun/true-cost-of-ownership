import { z } from 'zod'

export const carFormSchema = z.object({
  // General Information
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
  interestRate: z.number(), // percentage
  financingDuration: z.number().max(10), // years
  remainingAmount: z.number().optional(), // euros
  totalInterestPaid: z.number().optional(),
  truePurchasePrice: z.number().optional(),

  // Depreciation
  initialPrice: z.number(), // euros
  depreciationRate: z.number().optional(), // percentage

  // Warranty and Service
  guaranteeYears: z
    .number()
    .min(0, { message: "The Guaranteed years can't be less than 0" }), // years
  serviceCosts: z.number().optional(), // euros - this is done annually and regardless of any repairs are due to be paid.
  serviceIncludes: z.string().optional(), // list of the services
  tiresCosts: z.number().optional(), // euros, probably similar for different cars
  oilChangeCosts: z.number().optional(), // euros, as an example of the costs associated to the car
  offerOnExtendedWarranty: z.boolean().optional(),
  extendedWarrantyCost: z.number().optional(),

  // Efficiency
  totalPlannedKMs: z.number(), // KMs, total number of KMs planned to drive the car yearly
  fuelConsumption: z.number(), // liters per 100KM
  fuelType: z.enum([
    'Diesel',
    'Petrol',
    'Hybrid/Diesel',
    'Hybrid/Petrol',
    'Electric'
  ]),
  averageFuelCost: z.number(),

  // Insurance
  insuranceType: z.enum(['Minimum', 'Partial', 'Full']),
  insuranceCost: z.number(), // euros, depends on the car

  // Other Costs
  tuvCosts: z.number(), // euros, probably similar for different cars
  taxes: z.number(), // yearly
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
  tco: z.number()
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
=======
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

