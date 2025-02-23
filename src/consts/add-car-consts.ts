import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
import {
  CarFormFields,
  CarFormFieldsKeys,
  CarFormOptionalFields,
  CarFormOptionalFieldsKeys,
  FormFieldType,
  FormSteps,
  FormStepsIDs
} from '../components/types/add-car/types'
import { COUNTRIES } from './app-constants'

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
    inputSuffix: 'Kilometers'
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
    inputSuffix: 'Euros'
  },
  prepayment: {
    key: 'prepayment',
    type: 'number',
    required: true,
    label: 'Prepayment',
    component: 'input',
    inputSuffix: 'Euros'
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
    inputSuffix: 'Percentage/Year'
  },
  remainingAmount: {
    key: 'remainingAmount',
    type: 'number',
    required: false,
    label: 'Remaining amount',
    component: 'input',
    inputSuffix: 'Euros',
    infoField: true
  },
  totalInterestPaid: {
    key: 'totalInterestPaid',
    type: 'number',
    required: false,
    label: 'Total Interest Paid',
    component: 'input',
    inputSuffix: 'Euros',
    infoField: true
  },
  truePurchasePrice: {
    key: 'truePurchasePrice',
    type: 'number',
    required: false,
    label: 'True Purchase Price',
    component: 'input',
    inputSuffix: 'Euros',
    infoField: true
  },
  initialPrice: {
    key: 'initialPrice',
    type: 'number',
    required: false,
    label: 'Original Initial Price',
    component: 'input',
    inputSuffix: 'Euros'
  },
  depreciationRate: {
    key: 'depreciationRate',
    type: 'number',
    required: false,
    label: 'The car price depreciation rate',
    component: 'input',
    inputSuffix: 'Percentage/Year',
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
    inputSuffix: 'Euros'
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
    inputSuffix: 'Euros/Year'
  },
  oilChangeCosts: {
    key: 'oilChangeCosts',
    type: 'number',
    required: false,
    label: 'How much on average changing the car oil costs?',
    component: 'input',
    inputSuffix: 'Euros'
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
    inputSuffix: 'Euros'
  },
  totalPlannedKMs: {
    key: 'totalPlannedKMs',
    type: 'number',
    required: true,
    label: 'Planned traveling distance per year?',
    component: 'input',
    inputSuffix: 'Kilometers/Year'
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
    inputSuffix: 'Euros'
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
    inputSuffix: 'Euros'
  },
  tuvCosts: {
    key: 'tuvCosts',
    type: 'number',
    required: false,
    label: 'TÜV Costs',
    component: 'input',
    inputSuffix: 'Euros'
  },
  taxes: {
    key: 'taxes',
    type: 'number',
    required: false,
    label: 'Taxes',
    component: 'input',
    inputSuffix: 'Euros'
  },
  parkingCosts: {
    key: 'parkingCosts',
    type: 'number',
    required: false,
    label: 'Parking Costs',
    component: 'input',
    inputSuffix: 'Euros'
  },
  regularMaintenanceCosts: {
    key: 'regularMaintenanceCosts',
    type: 'number',
    required: false,
    label: 'Regular Maintenance Costs',
    component: 'input',
    inputSuffix: 'Euros'
  },
  unexpectedRepairCosts: {
    key: 'unexpectedRepairCosts',
    type: 'number',
    required: false,
    label: 'Unexpected Repair Costs',
    component: 'input',
    inputSuffix: 'Euros'
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
    inputSuffix: 'Euros'
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
    inputSuffix: 'Euros',
    infoField: true
  }
}

export const aiResponseFormFields: FormFieldType<CarFormOptionalFields>[] = [
  useFormField('name'),
  useFormField('interestRate'),
  useFormField('financingDuration'),
  useFormField('remainingAmount', { infoField: false }),
  useFormField('totalInterestPaid', { infoField: false }),
  useFormField('truePurchasePrice', { infoField: false }),
  useFormField('initialPrice'),
  useFormField('depreciationRate'),
  useFormField('serviceCosts'),
  useFormField('serviceIncludes'),
  useFormField('tiresCosts'),
  useFormField('oilChangeCosts'),
  useFormField('fuelConsumption'),
  useFormField('averageFuelCost'),
  useFormField('insuranceCost'),
  useFormField('tuvCosts'),
  useFormField('taxes'),
  useFormField('parkingCosts'),
  useFormField('estimatedResaleValue'),
  useFormField('regularMaintenanceCosts'),
  useFormField('unexpectedRepairCosts'),
  useFormField('maintenanceFrequency'),
  useFormField('emissions'),
  useFormField('ecoTax'),
  // useFormField('tco')
]

export const advancedFormSteps: FormSteps<CarFormFields>[] = [
  {
    id: 'generalInfo',
    index: 0,
    title: 'General Information',
    fields: [
      useFormField('name'),
      useFormField('brand'),
      useFormField('model'),
      useFormField('variant'),
      useFormField('year'),
      useFormField('mileage'),
      useFormField('plannedYearsOfOwnership'),
      useFormField('drivingExperienceYears'),
      useFormField('driverAgeRange')
    ]
  },
  {
    id: 'finances',
    index: 1,
    title: 'Finances',
    fields: [
      useFormField('purchasePrice'),
      useFormField('prepayment'),
      useFormField('financingDuration'),
      useFormField('interestRate'),
      useFormField('remainingAmount'),
      useFormField('totalInterestPaid'),
      useFormField('truePurchasePrice')
    ]
  },
  {
    id: 'depreciation',
    index: 2,
    title: 'Depreciation',
    fields: [useFormField('initialPrice'), useFormField('depreciationRate')]
  },
  {
    id: 'warrantyAndService',
    index: 3,
    title: 'Warranty and Service',
    fields: [
      useFormField('guaranteeYears'),
      useFormField('serviceCosts'),
      useFormField('serviceIncludes'),
      useFormField('tiresCosts'),
      useFormField('oilChangeCosts'),
      useFormField('offerOnExtendedWarranty'),
      useFormField('extendedWarrantyCost')
    ]
  },
  {
    id: 'efficiency',
    index: 4,
    title: 'Efficiency',
    fields: [
      useFormField('totalPlannedKMs'),
      useFormField('fuelConsumption'),
      useFormField('fuelType'),
      useFormField('averageFuelCost')
    ]
  },
  {
    id: 'insurance',
    index: 5,
    title: 'Insurance',
    fields: [useFormField('insuranceType'), useFormField('insuranceCost')]
  },
  {
    id: 'otherCosts',
    index: 6,
    title: 'Other Costs',
    fields: [
      useFormField('tuvCosts'),
      useFormField('taxes'),
      useFormField('parkingCosts')
    ]
  },
  {
    id: 'maintenance',
    index: 7,
    title: 'Maintenance',
    fields: [
      useFormField('regularMaintenanceCosts'),
      useFormField('unexpectedRepairCosts'),
      useFormField('maintenanceFrequency')
    ]
  },
  {
    id: 'personalPreferences',
    index: 8,
    title: 'Personal Preferences',
    fields: [useFormField('interiorScore'), useFormField('exteriorScore')]
  },
  {
    id: 'environmentalImpact',
    index: 9,
    title: 'Environmental Impact',
    fields: [useFormField('emissions'), useFormField('ecoTax')]
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

export function useFormField<
  K extends FormFieldKey,
  T extends Partial<Omit<(typeof formFields)[K], 'key'>>
>(key: K, overrides?: T): (typeof formFields)[K] & { key: K } {
  const defaultField = formFields[key]
  // Spread overrides, but force the key to remain the literal value.
  return { ...defaultField, ...overrides, key } as (typeof formFields)[K] & {
    key: K
  }
}
