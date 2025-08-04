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
  transmissionType: undefined,
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
