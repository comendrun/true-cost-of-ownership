import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
import { FormSteps, FormStepsIDs } from '../_components/_types/types'

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
        key: 'financingDuration',
        type: 'number',
        required: true,
        label: 'Financing Duration',
        component: 'input',
        inputSuffix: 'Years'
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
        key: 'remainingAmount',
        type: 'number',
        required: true,
        label: 'Remaining amount',
        component: 'input',
        inputSuffix: 'Euros',
        infoField: true
      },
      {
        key: 'totalInterestPaid',
        type: 'number',
        required: true,
        label: 'Total Interest Paid',
        component: 'input',
        inputSuffix: 'Euros',
        infoField: true
      },
      {
        key: 'truePurchasePrice',
        type: 'number',
        required: true,
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
