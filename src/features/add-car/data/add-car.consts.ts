import { COUNTRIES } from '@/data/app.consts'
import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
import { FormFieldType } from '@/types/form-field.types'
import {
  CarFormFieldsKeys,
  CarFormOptionalFieldsKeys,
  CarFormOptionalFields,
  FormSteps,
  CarFormFields,
  FormStepsIDs
} from '../types/add-cars.types'

export const FORM_VALUES_STORED_KEY = 'car-form-store'

export const FORM_ERROR_MESSAGE_KEY = 'car-form-error-message'

export const FORM_ERROR_MESSAGE =
  "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."

// export type AppFormFieldKeys = Partial<
//   CarFormFieldsKeys & CarFormOptionalFieldsKeys
// >

export type FormFieldKey =
  | string
  | CarFormFieldsKeys
  | CarFormOptionalFieldsKeys

export const formFields: Record<FormFieldKey, FormFieldType> = {
  name: {
    key: 'name',
    type: 'string',
    required: false,
    label: 'Name',
    component: 'input',
    placeholder: 'Name',
    fullWidth: true,
    formDescription:
      'Please choose a proper name for the Car you want to analyze.'
  },
  brand: {
    key: 'brand',
    type: 'string',
    required: true,
    label: 'Car Brand',
    component: 'select',
    selectItems: getAllBrands()
  },
  model: {
    key: 'model',
    type: 'string',
    required: true,
    label: 'Car Model',
    component: 'select',
    selectItems: values => (getModelsByBrand(values.brand) as string[]) || []
  },
  variant: {
    key: 'variant',
    type: 'string',
    required: false,
    label: 'Variant',
    component: 'input',
    placeholder: 'Variant'
  },
  year: {
    key: 'year',
    type: 'number',
    required: true,
    label: 'First Registration Year',
    component: 'select',
    selectItems: values =>
      getYearsByBrandAndModel(values.brand, values.model) || []
  },
  mileage: {
    key: 'mileage',
    type: 'number',
    required: true,
    label: 'Mileage',
    component: 'input',
    inputSuffix: 'KM'
  },
  plannedYearsOfOwnership: {
    key: 'plannedYearsOfOwnership',
    type: 'number',
    required: true,
    label: 'Planned Ownership in Years',
    component: 'input',
    inputSuffix: 'Years'
  },
  drivingExperienceYears: {
    key: 'drivingExperienceYears',
    type: 'number',
    required: true,
    label: 'Driving Experience in Years',
    component: 'input',
    inputSuffix: 'Years'
  },
  driverAgeRange: {
    key: 'driverAgeRange',
    type: 'string',
    required: true,
    label: "Driver's Age",
    component: 'select',
    selectItems: ['18-25', '25-35', '35-55', '55+']
  },
  purchasePrice: {
    key: 'purchasePrice',
    type: 'number',
    required: true,
    label: 'Price',
    component: 'input',
    inputSuffix: '€'
  },
  prepayment: {
    key: 'prepayment',
    type: 'number',
    required: true,
    label: 'Prepayment',
    component: 'input',
    inputSuffix: '€'
  },
  financingDuration: {
    key: 'financingDuration',
    type: 'number',
    required: false,
    label: 'Financing Duration',
    component: 'input',
    inputSuffix: 'Years'
  },
  interestRate: {
    key: 'interestRate',
    type: 'number',
    required: false,
    label: 'Interest Rate',
    component: 'input',
    inputSuffix: '%/Year'
  },
  remainingAmount: {
    key: 'remainingAmount',
    type: 'number',
    required: false,
    label: 'Remaining amount',
    component: 'input',
    inputSuffix: '€',
    infoField: true
  },
  totalInterestPaid: {
    key: 'totalInterestPaid',
    type: 'number',
    required: false,
    label: 'Total Interest Paid',
    component: 'input',
    inputSuffix: '€',
    infoField: true
  },
  truePurchasePrice: {
    key: 'truePurchasePrice',
    type: 'number',
    required: false,
    label: 'True Purchase Price',
    component: 'input',
    inputSuffix: '€',
    infoField: true
  },
  initialPrice: {
    key: 'initialPrice',
    type: 'number',
    required: false,
    label: 'Original Initial Price',
    component: 'input',
    inputSuffix: '€'
  },
  depreciationRate: {
    key: 'depreciationRate',
    type: 'number',
    required: false,
    label: 'The car price depreciation rate',
    component: 'input',
    inputSuffix: '%/Year',
    infoField: true
  },
  guaranteeYears: {
    key: 'guaranteeYears',
    type: 'number',
    required: false,
    label: 'How many years of Warranty does the car have?',
    component: 'input',
    inputSuffix: 'Years'
  },
  serviceCosts: {
    key: 'serviceCosts',
    type: 'number',
    required: false,
    label: 'How much on average the car service costs?',
    component: 'input',
    inputSuffix: '€'
  },
  serviceIncludes: {
    key: 'serviceIncludes',
    type: 'string',
    required: false,
    label: 'Which services are included in the company regular service checks?',
    component: 'textarea',
    formDescription:
      'In case the company is offering a regular service, which items are being inspected and checked each visit?'
  },
  tiresCosts: {
    key: 'tiresCosts',
    type: 'number',
    required: false,
    label: 'Tires Costs',
    component: 'input',
    inputSuffix: '€/Year'
  },
  oilChangeCosts: {
    key: 'oilChangeCosts',
    type: 'number',
    required: false,
    label: 'How much on average changing the car oil costs?',
    component: 'input',
    inputSuffix: '€'
  },
  offerOnExtendedWarranty: {
    key: 'offerOnExtendedWarranty',
    type: 'boolean',
    required: false,
    label: 'Does company allow for extending the warranty?',
    component: 'checkbox'
  },
  extendedWarrantyCost: {
    key: 'extendedWarrantyCost',
    type: 'number',
    required: false,
    label: 'How much extending car guarantee by the manufacturer costs?',
    component: 'input',
    inputSuffix: '€'
  },
  totalPlannedKMs: {
    key: 'totalPlannedKMs',
    type: 'number',
    required: true,
    label: 'Planned traveling distance per year?',
    component: 'input',
    inputSuffix: 'KM/Year'
  },
  fuelConsumption: {
    key: 'fuelConsumption',
    type: 'number',
    required: false,
    label: 'Fuel per 100KM?',
    component: 'input',
    inputSuffix: 'Liters/100KM'
  },
  fuelType: {
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
  averageFuelCost: {
    key: 'averageFuelCost',
    type: 'number',
    required: false,
    label: 'Average Fuel cost?',
    component: 'input',
    inputSuffix: '€'
  },
  insuranceType: {
    key: 'insuranceType',
    type: 'string',
    required: true,
    label: 'Insurance Type',
    component: 'select',
    selectItems: ['Minimum', 'Partial', 'Full']
  },
  insuranceCost: {
    key: 'insuranceCost',
    type: 'number',
    required: false,
    label: 'Insurance Cost',
    component: 'input',
    inputSuffix: '€'
  },
  tuvCosts: {
    key: 'tuvCosts',
    type: 'number',
    required: false,
    label: 'TÜV Costs',
    component: 'input',
    inputSuffix: '€'
  },
  taxes: {
    key: 'taxes',
    type: 'number',
    required: false,
    label: 'Taxes',
    component: 'input',
    inputSuffix: '€'
  },
  parkingCosts: {
    key: 'parkingCosts',
    type: 'number',
    required: false,
    label: 'Parking Costs',
    component: 'input',
    inputSuffix: '€'
  },
  regularMaintenanceCosts: {
    key: 'regularMaintenanceCosts',
    type: 'number',
    required: false,
    label: 'Regular Maintenance Costs',
    component: 'input',
    inputSuffix: '€'
  },
  unexpectedRepairCosts: {
    key: 'unexpectedRepairCosts',
    type: 'number',
    required: false,
    label: 'Unexpected Repair Costs',
    component: 'input',
    inputSuffix: '€'
  },
  maintenanceFrequency: {
    key: 'maintenanceFrequency',
    type: 'string',
    required: false,
    label: 'Maintenance Frequency',
    component: 'input'
  },
  interiorScore: {
    key: 'interiorScore',
    type: 'number',
    required: false,
    label: 'Interior Design',
    component: 'select',
    selectItems: Array.from({ length: 11 }, (_, i) => (i - 5).toString())
  },
  exteriorScore: {
    key: 'exteriorScore',
    type: 'number',
    required: false,
    label: 'Exterior Design',
    component: 'select',
    selectItems: Array.from({ length: 11 }, (_, i) => (i - 5).toString())
  },
  emissions: {
    key: 'emissions',
    type: 'number',
    required: false,
    label: 'Emissions',
    component: 'input',
    inputSuffix: 'g/km'
  },
  ecoTax: {
    key: 'ecoTax',
    type: 'number',
    required: false,
    label: 'Eco Tax',
    component: 'input',
    inputSuffix: '€'
  },
  country: {
    key: 'country',
    type: 'string',
    component: 'select',
    required: false,
    label: 'Country',
    selectItems: Object.values(COUNTRIES) as string[]
  },
  tco: {
    key: 'tco',
    type: 'number',
    required: false,
    label: 'Total Cost of Ownership',
    component: 'input',
    inputSuffix: '€',
    infoField: true
  }
}

export const aiResponseFormFields: FormFieldType<CarFormOptionalFields>[] = [
  getFormField('name'),
  getFormField('interestRate'),
  getFormField('financingDuration'),
  getFormField('remainingAmount', { infoField: false }),
  getFormField('totalInterestPaid', { infoField: false }),
  getFormField('truePurchasePrice', { infoField: false }),
  getFormField('initialPrice'),
  getFormField('depreciationRate'),
  getFormField('serviceCosts'),
  getFormField('serviceIncludes'),
  getFormField('tiresCosts'),
  getFormField('oilChangeCosts'),
  getFormField('fuelConsumption'),
  getFormField('averageFuelCost'),
  getFormField('insuranceCost'),
  getFormField('tuvCosts'),
  getFormField('taxes'),
  getFormField('parkingCosts'),
  getFormField('estimatedResaleValue'),
  getFormField('regularMaintenanceCosts'),
  getFormField('unexpectedRepairCosts'),
  getFormField('maintenanceFrequency'),
  getFormField('emissions'),
  getFormField('ecoTax')
  // getFormField('tco')
]

// export const advancedFormSteps: FormSteps<CarFormFields>[] = [
//   {
//     id: 'generalInfo',
//     index: 0,
//     title: 'General Information',
//     fields: [
//       getFormField('name'),
//       getFormField('brand'),
//       getFormField('model'),
//       getFormField('variant'),
//       getFormField('year'),
//       getFormField('mileage'),
//       getFormField('plannedYearsOfOwnership'),
//       getFormField('drivingExperienceYears'),
//       getFormField('driverAgeRange')
//     ]
//   },
//   {
//     id: 'finances',
//     index: 1,
//     title: 'Finances',
//     fields: [
//       getFormField('purchasePrice'),
//       getFormField('prepayment'),
//       getFormField('financingDuration'),
//       getFormField('interestRate'),
//       getFormField('remainingAmount'),
//       getFormField('totalInterestPaid'),
//       getFormField('truePurchasePrice')
//     ]
//   },
//   {
//     id: 'depreciation',
//     index: 2,
//     title: 'Depreciation',
//     fields: [getFormField('initialPrice'), getFormField('depreciationRate')]
//   },
//   {
//     id: 'warrantyAndService',
//     index: 3,
//     title: 'Warranty and Service',
//     fields: [
//       getFormField('guaranteeYears'),
//       getFormField('serviceCosts'),
//       getFormField('serviceIncludes'),
//       getFormField('tiresCosts'),
//       getFormField('oilChangeCosts'),
//       getFormField('offerOnExtendedWarranty'),
//       getFormField('extendedWarrantyCost')
//     ]
//   },
//   {
//     id: 'efficiency',
//     index: 4,
//     title: 'Efficiency',
//     fields: [
//       getFormField('totalPlannedKMs'),
//       getFormField('fuelConsumption'),
//       getFormField('fuelType'),
//       getFormField('averageFuelCost')
//     ]
//   },
//   {
//     id: 'insurance',
//     index: 5,
//     title: 'Insurance',
//     fields: [getFormField('insuranceType'), getFormField('insuranceCost')]
//   },
//   {
//     id: 'otherCosts',
//     index: 6,
//     title: 'Other Costs',
//     fields: [
//       getFormField('tuvCosts'),
//       getFormField('taxes'),
//       getFormField('parkingCosts')
//     ]
//   },
//   {
//     id: 'maintenance',
//     index: 7,
//     title: 'Maintenance',
//     fields: [
//       getFormField('regularMaintenanceCosts'),
//       getFormField('unexpectedRepairCosts'),
//       getFormField('maintenanceFrequency')
//     ]
//   },
//   {
//     id: 'personalPreferences',
//     index: 8,
//     title: 'Personal Preferences',
//     fields: [getFormField('interiorScore'), getFormField('exteriorScore')]
//   },
//   {
//     id: 'environmentalImpact',
//     index: 9,
//     title: 'Environmental Impact',
//     fields: [getFormField('emissions'), getFormField('ecoTax')]
//   }
// ]

export const advancedFormSteps: FormSteps<CarFormFields>[] = [
  {
    id: 'essentialInfo',
    index: 0,
    title: 'Essential Information',
    fields: [
      getFormField('name'), // Always included
      getFormField('brand'), // Required
      getFormField('model'), // Required
      getFormField('variant'), // Always included
      getFormField('year'), // Required
      getFormField('mileage'), // Required
      getFormField('plannedYearsOfOwnership'), // Required
      getFormField('drivingExperienceYears'), // Required
      getFormField('driverAgeRange'), // Required
      getFormField('purchasePrice'), // Required
      getFormField('prepayment'), // Required
      getFormField('totalPlannedKMs'), // Required
      getFormField('fuelType'), // Required
      getFormField('insuranceType') // Required
    ]
  },
  {
    id: 'financialOverview',
    index: 1,
    title: 'Financial Overview & Depreciation',
    fields: [
      // Non-required financial details
      getFormField('financingDuration'),
      getFormField('interestRate'),
      getFormField('remainingAmount'),
      getFormField('totalInterestPaid'),
      getFormField('truePurchasePrice'),
      // Depreciation information
      getFormField('initialPrice'),
      getFormField('depreciationRate')
    ]
  },
  {
    id: 'efficiencyConsumption',
    index: 2,
    title: 'Efficiency & Consumption',
    fields: [
      // Efficiency non-required fields (the required ones were moved)
      getFormField('fuelConsumption'),
      getFormField('averageFuelCost')
    ]
  },
  {
    id: 'maintenanceWarranty',
    index: 3,
    title: 'Maintenance, Warranty & Additional Costs',
    fields: [
      // Warranty and service details
      getFormField('guaranteeYears'),
      getFormField('serviceCosts'),
      getFormField('serviceIncludes'),
      getFormField('tiresCosts'),
      getFormField('oilChangeCosts'),
      getFormField('offerOnExtendedWarranty'),
      getFormField('extendedWarrantyCost'),
      // Insurance and other costs
      getFormField('insuranceCost'),
      getFormField('tuvCosts'),
      getFormField('taxes'),
      getFormField('parkingCosts'),
      // Maintenance details
      getFormField('regularMaintenanceCosts'),
      getFormField('unexpectedRepairCosts'),
      getFormField('maintenanceFrequency'),
      // Personal preferences and environmental aspects
      getFormField('interiorScore'),
      getFormField('exteriorScore'),
      getFormField('emissions'),
      getFormField('ecoTax')
    ]
  }
]

export const formStepIndexMap = advancedFormSteps.reduce(
  (map, step, index) => {
    map[step.id] = index
    return map
  },
  {} as Record<FormStepsIDs, number>
)

export const formStepIdMap = advancedFormSteps.reduce(
  (map, step, index) => {
    map[index] = step.id
    return map
  },
  {} as Record<number, FormStepsIDs>
)

export function getFormField<
  K extends FormFieldKey,
  T extends Partial<Omit<(typeof formFields)[K], 'key'>>
>(key: K, overrides?: T): (typeof formFields)[K] & { key: K } {
  const defaultField = formFields[key]
  // Spread overrides, but force the key to remain the literal value.
  return { ...defaultField, ...overrides, key } as (typeof formFields)[K] & {
    key: K
  }
}
