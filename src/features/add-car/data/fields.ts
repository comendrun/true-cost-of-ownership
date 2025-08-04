import { COUNTRIES } from '@/data/app.consts'
import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
import { FormFieldType } from '@/types/form-field.types'
import { FormFieldKey } from '../types/add-cars.types'

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
  transmissionType: {
    key: 'transmissionType',
    type: 'string',
    required: true,
    label: 'Transmission Type',
    component: 'select',
    selectItems: ['Manual', 'Automatic', 'Semi-Automatic', 'CVT']
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
