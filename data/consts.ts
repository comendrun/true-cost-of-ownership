import { CarFormFields } from '@/components/types/add-car/types'

// export const carFormDefaultValues: CarFormFields = {
//   name: undefined,
//   brand: '', // Initially empty; a brand must be selected
//   model: '', // Initially empty; a model must be selected
//   variant: undefined,
//   year: new Date().getFullYear(), // Current year as default
//   mileage: 0, // Default to 0 km (brand new)
//   plannedYearsOfOwnership: 1, // Default to 1 year of ownership

//   interiorScore: 0, // Midpoint score (on a scale of -5 to 5)
//   exteriorScore: 0, // Midpoint score (on a scale of -5 to 5)

//   purchasePrice: 20000, // Example purchase price in euros
//   prepayment: 0, // Example prepayment in euros
//   remainingAmount: 20000, // Calculated as purchase price - prepayment
//   interestRate: 5, // Example interest rate in percentage
//   financingDuration: 5, // Financing duration of 5 years
//   totalInterestPaid: 0, // Initially 0
//   truePurchasePrice: 20000, // Initially same as purchase price

//   initialPrice: 25000, // Initial price of the model (new price)
//   depreciationRate: 15, // Example depreciation rate in percentage per year

//   guaranteeYears: 2, // Example guarantee duration in years
//   serviceCosts: 300, // Example service costs in euros per year
//   serviceIncludes: 'Regular maintenance, oil change', // Example list of included services
//   tiresCosts: 400, // Example costs for tires in euros per year
//   oilChangeCosts: 100, // Example oil change costs in euros
//   offerOnExtendedWarranty: false, // Default to not offering extended warranty
//   extendedWarrantyCost: undefined, // No cost associated initially

//   totalPlannedKMs: 15000, // Example total planned kilometers per year
//   fuelConsumption: 6, // Example fuel consumption in liters per 100 km
//   fuelType: 'Petrol', // Default fuel type
//   averageFuelCost: 0, // Initially 0

//   insuranceType: 'Full', // Default insurance type
//   insuranceCost: 800, // Example insurance cost in euros per year

//   tuvCosts: 80, // Example Tüv costs in euros per year
//   taxes: 150, // Example yearly taxes in euros
//   parkingCosts: undefined, // Initially undefined

//   estimatedResaleValue: undefined, // Initially undefined
//   resaleValueAfterYears: undefined, // Initially undefined

//   regularMaintenanceCosts: undefined, // Initially undefined
//   unexpectedRepairCosts: undefined, // Initially undefined
//   maintenanceFrequency: undefined, // Initially undefined

//   emissions: undefined, // Initially undefined
//   ecoTax: undefined, // Initially undefined

//   tco: 0,
//   drivingExperienceYears: 0,
//   driverAgeRange: '18-25'
// }

export const defaultCarFormValues = {
  // General Information
  name: undefined,
  brand: undefined,
  model: undefined,
  variant: undefined,
  year: undefined,
  mileage: 0, // Default to 0 since it cannot be undefined
  plannedYearsOfOwnership: 1, // Minimum allowed value
  drivingExperienceYears: 0, // Minimum allowed value
  driverAgeRange: undefined,

  // Personal Preferences
  interiorScore: undefined,
  exteriorScore: undefined,

  // Finances
  purchasePrice: 0, // Default to 0 since it's required
  prepayment: 0, // Default to 0 since it's required
  interestRate: undefined,
  financingDuration: undefined,
  remainingAmount: undefined,
  totalInterestPaid: undefined,
  truePurchasePrice: undefined,

  // Depreciation
  initialPrice: undefined,
  depreciationRate: undefined,

  // Warranty and Service
  guaranteeYears: undefined,
  serviceCosts: undefined,
  serviceIncludes: undefined,
  tiresCosts: undefined,
  oilChangeCosts: undefined,
  offerOnExtendedWarranty: undefined,
  extendedWarrantyCost: undefined,

  // Efficiency
  totalPlannedKMs: 0, // Default to 0 since it's required
  fuelConsumption: undefined,
  fuelType: undefined,
  averageFuelCost: undefined,

  // Insurance
  insuranceType: undefined,
  insuranceCost: undefined,

  // Other Costs
  tuvCosts: undefined,
  taxes: undefined,
  parkingCosts: undefined,

  // Resale Value
  estimatedResaleValue: undefined,
  resaleValueAfterYears: undefined,

  // Maintenance
  regularMaintenanceCosts: undefined,
  unexpectedRepairCosts: undefined,
  maintenanceFrequency: undefined,

  // Environmental Impact
  emissions: undefined,
  ecoTax: undefined,

  // Total Cost of Ownership
  tco: undefined
}
