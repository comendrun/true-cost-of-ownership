import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
import {
  CarFormFields,
  CarFormOptionalFields,
  FormFieldType,
  FormSteps,
  FormStepsIDs
} from '../_types/types'

export const FORM_VALUES_STORED_KEY = 'car-form-store'

export const FORM_ERROR_MESSAGE_KEY = 'car-form-error-message'

export const FORM_ERROR_MESSAGE =
  "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."

export const aiResponseFormFields: FormFieldType<CarFormOptionalFields>[] = [
  {
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
  {
    key: 'interestRate',
    type: 'number',
    required: false,
    label: 'Interest Rate',
    component: 'input',
    inputSuffix: 'Percentage/Year'
  },
  {
    key: 'financingDuration',
    type: 'number',
    required: false,
    label: 'Financing Duration',
    component: 'input',
    inputSuffix: 'Years'
  },
  {
    key: 'remainingAmount',
    type: 'number',
    required: false,
    label: 'Remaining amount',
    component: 'input',
    inputSuffix: 'Euros'
    // infoField: true
  },
  {
    key: 'totalInterestPaid',
    type: 'number',
    required: false,
    label: 'Total Interest Paid',
    component: 'input',
    inputSuffix: 'Euros'
    // infoField: true
  },
  {
    key: 'truePurchasePrice',
    type: 'number',
    required: false,
    label: 'True Purchase Price',
    component: 'input',
    inputSuffix: 'Euros'
    // infoField: true
  },
  {
    key: 'initialPrice',
    type: 'number',
    required: false,
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
    inputSuffix: 'Percentage/Year'
    // infoField: true
  },
  // {
  //   key: 'guaranteeYears',
  //   type: 'number',
  //   required: false,
  //   label: 'How many years of Warranty does the car have?',
  //   component: 'input',
  //   inputSuffix: 'Years'
  // },
  {
    key: 'serviceCosts',
    type: 'number',
    required: false,
    label: 'How much on average the car service costs?',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'serviceIncludes',
    type: 'string',
    required: false,
    label: 'Which services are included in the company regular service checks?',
    component: 'textarea',
    formDescription:
      'In case the company is offering a regular service, which items are being inspected and checked each visit?'
  },
  {
    key: 'tiresCosts',
    type: 'number',
    required: false,
    label: 'Tires Costs',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'oilChangeCosts',
    type: 'number',
    required: false,
    label: 'How much on average changing the car oil costs?',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'fuelConsumption',
    type: 'number',
    required: false,
    label: 'Fuel per 100KM?',
    component: 'input',
    inputSuffix: 'Liters/100KM'
  },
  {
    key: 'averageFuelCost',
    type: 'number',
    required: false,
    label: 'Average Fuel cost?',
    component: 'input',
    inputSuffix: 'Euros'
  },
  {
    key: 'insuranceCost',
    type: 'number',
    required: false,
    label: 'Insurance Cost',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'tuvCosts',
    type: 'number',
    required: false,
    label: 'TÜV Costs',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'taxes',
    type: 'number',
    required: false,
    label: 'Taxes',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'parkingCosts',
    type: 'number',
    required: false,
    label: 'Parking Costs',
    component: 'input',
    inputSuffix: 'Euros/Month'
  },
  {
    key: 'estimatedResaleValue',
    type: 'number',
    required: false,
    label: 'Estimated Resale Value',
    component: 'input',
    inputSuffix: 'Euros'
  },
  // {
  //   key: 'resaleValueAfterYears',
  //   type: 'number',
  //   required: false,
  //   label: 'Resale Value After Years',
  //   component: 'input',
  //   inputSuffix: 'Years'
  // },
  {
    key: 'regularMaintenanceCosts',
    type: 'number',
    required: false,
    label: 'Regular Maintenance Costs',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'unexpectedRepairCosts',
    type: 'number',
    required: false,
    label: 'Unexpected Repair Costs',
    component: 'input',
    inputSuffix: 'Euros/Year'
  },
  {
    key: 'maintenanceFrequency',
    type: 'string',
    required: false,
    label: 'Maintenance Frequency',
    component: 'input'
  },
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
  },
  {
    key: 'tco',
    type: 'number',
    required: false,
    label: 'Total Cost of Ownership',
    component: 'input',
    inputSuffix: 'Euros',
    infoField: true
  }
]

export const advancedFormSteps: FormSteps<CarFormFields>[] = [
  {
    id: 'generalInfo',
    index: 0,
    title: 'General Information',
    fields: [
      {
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
        component: 'input',
        placeholder: 'Variant'
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
        label: 'Planned Ownership in Years',
        component: 'input',
        inputSuffix: 'Years'
      },
      {
        key: 'drivingExperienceYears',
        type: 'number',
        required: true,
        label: 'Driving Experience in Years',
        component: 'input',
        inputSuffix: 'Years'
      },
      {
        key: 'driverAgeRange',
        type: 'string',
        required: true,
        label: "Driver's Age",
        component: 'select',
        selectItems: ['18-25', '25-35', '35-55', '55+']
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
        key: 'financingDuration',
        type: 'number',
        required: false,
        label: 'Financing Duration',
        component: 'input',
        inputSuffix: 'Years'
      },
      {
        key: 'interestRate',
        type: 'number',
        required: false,
        label: 'Interest Rate',
        component: 'input',
        inputSuffix: 'Percentage'
      },
      {
        key: 'remainingAmount',
        type: 'number',
        required: false,
        label: 'Remaining amount',
        component: 'input',
        inputSuffix: 'Euros',
        infoField: true
      },
      {
        key: 'totalInterestPaid',
        type: 'number',
        required: false,
        label: 'Total Interest Paid',
        component: 'input',
        inputSuffix: 'Euros',
        infoField: true
      },
      {
        key: 'truePurchasePrice',
        type: 'number',
        required: false,
        label: 'True Purchase Price',
        component: 'input',
        inputSuffix: 'Euros',
        infoField: true
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
        required: false,
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
        inputSuffix: 'Percentage',
        infoField: true
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
        required: false,
        label: 'How many years of Warranty does the car have?',
        component: 'input',
        inputSuffix: 'Years'
      },
      {
        key: 'serviceCosts',
        type: 'number',
        required: false,
        label: 'How much on average the car service costs?',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'serviceIncludes',
        type: 'string',
        required: false,
        label:
          'Which services are included in the company regular service checks?',
        component: 'textarea',
        formDescription:
          'In case the company is offering a regular service, which items are being inspected and checked each visit?'
      },
      {
        key: 'tiresCosts',
        type: 'number',
        required: false,
        label: 'Tires Costs',
        component: 'input',
        inputSuffix: 'Euros/Year'
      },
      {
        key: 'oilChangeCosts',
        type: 'number',
        required: false,
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
        inputSuffix: 'Kilometers/Year'
      },
      {
        key: 'fuelConsumption',
        type: 'number',
        required: false,
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
        required: false,
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
        required: false,
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
        required: false,
        label: 'TÜV Costs',
        component: 'input',
        inputSuffix: 'Euros'
      },
      {
        key: 'taxes',
        type: 'number',
        required: false,
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
  // {
  //   id: 'resaleValue',
  //   index: 7,
  //   title: 'Resale Value',
  //   fields: [
  //     {
  //       key: 'estimatedResaleValue',
  //       type: 'number',
  //       required: false,
  //       label: 'Estimated Resale Value',
  //       component: 'input',
  //       inputSuffix: 'Euros'
  //     },
  //     {
  //       key: 'resaleValueAfterYears',
  //       type: 'number',
  //       required: false,
  //       label: 'Resale Value After Years',
  //       component: 'input',
  //       inputSuffix: 'Years'
  //     }
  //   ]
  // },
  {
    id: 'maintenance',
    index: 7,
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
    index: 8,
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
    index: 9,
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
