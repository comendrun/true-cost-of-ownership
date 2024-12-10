import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
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
  remainingAmount: z.number(), // euros
  interestRate: z.number(), // percentage
  financingDuration: z.number().max(10), // years
  totalInterestPaid: z.number(),
  truePurchasePrice: z.number(),

  // Depreciation
  initialPrice: z.number(), // euros
  depreciationRate: z.number().optional(), // percentage

  // Warranty and Service
  guaranteeYears: z.number(), // years
  serviceCosts: z.number(), // euros - this is done annually and regardless of any repairs are due to be paid.
  serviceIncludes: z.string(), // list of the services
  tiresCosts: z.number(), // euros, probably similar for different cars
  oilChangeCosts: z.number(), // euros, as an example of the costs associated to the car
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
}

type InputField = BaseField & {
  component: 'input'
  inputSuffix?: string
}

type SelectField = BaseField & {
  component: 'select'
  placeholder?: string
  selectItems:
    | string[]
    | ((arg1: CarFormValues) => string[] | number[] | undefined)
}

type TextareaField = BaseField & {
  component: 'textarea'
  placeholder?: string
}

type CheckboxField = BaseField & {
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

export const isInputField = (field: FormFieldType): field is InputField =>
  field.component === 'input'

export const isSelectField = (field: FormFieldType): field is SelectField =>
  field.component === 'select'

export const isTextareaField = (field: FormFieldType): field is TextareaField =>
  field.component === 'textarea'

export const isChekboxField = (field: FormFieldType): field is CheckboxField =>
  field.component === 'checkbox'

export const advancedFormSteps: FormSteps[] = [
  {
    id: 'generalInfo',
    index: 0,
    title: 'General Information',
    fields: [
      {
        key: 'brand',
        type: 'string',
        required: true,
        label: 'Car Brand',
        component: 'select',
        selectItems: getAllBrands()
      },
      {
        key: 'model',
        type: 'string',
        required: true,
        label: 'Car Model',
        component: 'select',
        selectItems: values =>
          (getModelsByBrand(values.brand) as string[]) || []
      },
      {
        key: 'variant',
        type: 'string',
        required: false,
        label: 'Variant',
        component: 'input'
      },
      {
        key: 'year',
        type: 'number',
        required: true,
        label: 'First Registration Year',
        component: 'select',
        selectItems: values =>
          getYearsByBrandAndModel(values.brand, values.model) || []
      },
      {
        key: 'mileage',
        type: 'number',
        required: true,
        label: 'Mileage',
        component: 'input',
        inputSuffix: 'Kilometers'
      },
      {
        key: 'plannedYearsOfOwnership',
        type: 'number',
        required: true,
        label: 'Planned Ownership time in years',
        component: 'input',
        inputSuffix: 'Years'
      }
    ]
  },
  {
    id: 'finances',
    index: 1,
    title: 'Finances',
    fields: [
      {
        key: 'purchasePrice',
        type: 'number',
        required: true,
        label: 'Price',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'prepayment',
        type: 'number',
        required: true,
        label: 'Prepayment',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'remainingAmount',
        type: 'number',
        required: true,
        label: 'Remaining amount',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'interestRate',
        type: 'number',
        required: true,
        label: 'Interest Rate',
        component: 'input',
        inputSuffix: 'Percentage'
      },
      {
        key: 'financingDuration',
        type: 'number',
        required: true,
        label: 'Financing Duration',
        component: 'input',
        inputSuffix: 'Years'
      },
      {
        key: 'totalInterestPaid',
        type: 'number',
        required: true,
        label: 'Total Interest Paid',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'truePurchasePrice',
        type: 'number',
        required: true,
        label: 'True Purchase Price',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  },
  {
    id: 'depreciation',
    index: 2,
    title: 'Depreciation',
    fields: [
      {
        key: 'initialPrice',
        type: 'number',
        required: true,
        label: 'Original Initial Price',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'depreciationRate',
        type: 'number',
        required: false,
        label: 'The car price depreciation rate',
        component: 'input',
        inputSuffix: 'Percentage'
      }
    ]
  },
  {
    id: 'warrantyAndService',
    index: 3,
    title: 'Warranty and Service',
    fields: [
      {
        key: 'guaranteeYears',
        type: 'number',
        required: true,
        label: 'How many years of Warranty does the car have?',
        component: 'input',
        inputSuffix: 'Years'
      },
      {
        key: 'serviceCosts',
        type: 'number',
        required: true,
        label: 'How much on average the car service costs?',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'serviceIncludes',
        type: 'string',
        required: true,
        label:
          'Which services are included in the company regular service checks?',
        component: 'textarea',
        formDescription:
          'In case the company is offering a regular service, which items are being inspected and checked each visit?'
      },
      {
        key: 'tiresCosts',
        type: 'number',
        required: true,
        label: 'Tires Costs',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'oilChangeCosts',
        type: 'number',
        required: true,
        label: 'How much on average changing the car oil costs?',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'offerOnExtendedWarranty',
        type: 'boolean',
        required: false,
        label: 'Does company allow for extending the warranty?',
        component: 'checkbox'
      },
      {
        key: 'extendedWarrantyCost',
        type: 'number',
        required: false,
        label: 'How much extending car guarantee by the manufacturer costs?',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  },
  {
    id: 'efficiency',
    index: 4,
    title: 'Efficiency',
    fields: [
      {
        key: 'totalPlannedKMs',
        type: 'number',
        required: true,
        label: 'Planned traveling distance per year?',
        component: 'input',
        inputSuffix: 'Kilometers'
      },
      {
        key: 'fuelConsumption',
        type: 'number',
        required: true,
        label: 'Fuel per 100KM?',
        component: 'input',
        inputSuffix: 'Liters'
      },
      {
        key: 'fuelType',
        type: 'string',
        required: true,
        label: 'Fuel Type',
        component: 'select',
        selectItems: [
          'Diesel',
          'Petrol',
          'Hybrid/Diesel',
          'Hybrid/Petrol',
          'Electric'
        ]
      },
      {
        key: 'averageFuelCost',
        type: 'number',
        required: true,
        label: 'Average Fuel cost?',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  },
  {
    id: 'insurance',
    index: 5,
    title: 'Insurance',
    fields: [
      {
        key: 'insuranceType',
        type: 'string',
        required: true,
        label: 'Insurance Type',
        component: 'select',
        selectItems: ['Minimum', 'Partial', 'Full']
      },
      {
        key: 'insuranceCost',
        type: 'number',
        required: true,
        label: 'Insurance Cost',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  },
  {
    id: 'otherCosts',
    index: 6,
    title: 'Other Costs',
    fields: [
      {
        key: 'tuvCosts',
        type: 'number',
        required: true,
        label: 'TÜV Costs',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'taxes',
        type: 'number',
        required: true,
        label: 'Taxes',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'parkingCosts',
        type: 'number',
        required: false,
        label: 'Parking Costs',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  },
  {
    id: 'resaleValue',
    index: 7,
    title: 'Resale Value',
    fields: [
      {
        key: 'estimatedResaleValue',
        type: 'number',
        required: false,
        label: 'Estimated Resale Value',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'resaleValueAfterYears',
        type: 'number',
        required: false,
        label: 'Resale Value After Years',
        component: 'input',
        inputSuffix: 'Years'
      }
    ]
  },
  {
    id: 'maintenance',
    index: 8,
    title: 'Maintenance',
    fields: [
      {
        key: 'regularMaintenanceCosts',
        type: 'number',
        required: false,
        label: 'Regular Maintenance Costs',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'unexpectedRepairCosts',
        type: 'number',
        required: false,
        label: 'Unexpected Repair Costs',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'maintenanceFrequency',
        type: 'string',
        required: false,
        label: 'Maintenance Frequency',
        component: 'input'
      }
    ]
  },
  {
    id: 'personalPreferences',
    index: 9,
    title: 'Personal Preferences',
    fields: [
      {
        key: 'interiorScore',
        type: 'number',
        required: false,
        label: 'Interior Design',
        component: 'select',
        selectItems: Array.from({ length: 11 }, (_, i) => (i - 5).toString())
      },
      {
        key: 'exteriorScore',
        type: 'number',
        required: false,
        label: 'Exterior Design',
        component: 'select',
        selectItems: Array.from({ length: 11 }, (_, i) => (i - 5).toString())
      }
    ]
  },
  {
    id: 'environmentalImpact',
    index: 10,
    title: 'Environmental Impact',
    fields: [
      {
        key: 'emissions',
        type: 'number',
        required: false,
        label: 'Emissions',
        component: 'input',
        inputSuffix: 'g/km'
      },
      {
        key: 'ecoTax',
        type: 'number',
        required: false,
        label: 'Eco Tax',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  },
  {
    id: 'totalCostOfOwnership',
    index: 11,
    title: 'Total Cost of Ownership',
    fields: [
      {
        key: 'tco',
        type: 'number',
        required: true,
        label: 'Total Cost of Ownership',
        component: 'input',
        inputSuffix: 'Euros'
      }
    ]
  }
]

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

export const formStepIndexMap: Record<FormStepsIDs, number> = {
  generalInfo: 0,
  finances: 1,
  depreciation: 2,
  warrantyAndService: 3,
  efficiency: 4,
  insurance: 5,
  otherCosts: 6,
  resaleValue: 7,
  maintenance: 8,
  personalPreferences: 9,
  environmentalImpact: 10,
  totalCostOfOwnership: 11
}

export const formStepIdMap: Record<number, FormStepsIDs> = {
  0: 'generalInfo',
  1: 'finances',
  2: 'depreciation',
  3: 'warrantyAndService',
  4: 'efficiency',
  5: 'insurance',
  6: 'otherCosts',
  7: 'resaleValue',
  8: 'maintenance',
  9: 'personalPreferences',
  10: 'environmentalImpact',
  11: 'totalCostOfOwnership'
}
