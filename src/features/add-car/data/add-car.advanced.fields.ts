import { FormFieldType } from '@/types/form-field.types'
import {
  CarFormFields,
  CarFormOptionalFields,
  FormSteps,
  FormStepsIDs
} from '../types/add-cars.types'
import { getFormField } from './fields'

export const FORM_VALUES_STORED_KEY = 'car-form-store'

export const FORM_ERROR_MESSAGE_KEY = 'car-form-error-message'

export const FORM_ERROR_MESSAGE =
  "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."

// export type AppFormFieldKeys = Partial<
//   CarFormFieldsKeys & CarFormOptionalFieldsKeys
// >

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
