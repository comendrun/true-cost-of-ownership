import { CarFormValues } from "@/types";

export const carFormDefaultValues: CarFormValues = {
  brand: "", // Initially empty; a brand must be selected
  model: "", // Initially empty; a model must be selected
  variant: "",
  year: 0, // Current year as default
  mileage: 0, // Default to 0 km (brand new)
  interiorScore: 5, // Midpoint score (on a scale of 1-10)
  exteriorScore: 5, // Midpoint score (on a scale of 1-10)
  purchasePrice: 20000, // Example purchase price in euros
  prepayment: 0, // Example prepayment in euros
  remainingAmount: 0, // Calculated as purchase price - prepayment
  interestRate: 5, // Example interest rate in percentage
  financingDuration: 5, // Financing duration of 5 years
  initialPrice: 25000, // Initial price of the model (new price)
  depreciationRate: 15, // Example depreciation rate in percentage per year
  guaranteeYears: 2, // Example guarantee duration in years
  serviceCosts: 300, // Example service costs in euros per year
  serviceIncludes: "Regular maintenance, oil change", // Example list of included services
  tiresCosts: 400, // Example costs for tires in euros per year
  tuvCosts: 80, // Example Tüv costs in euros per year
  oilChangeCosts: 100, // Example oil change costs in euros
  insuranceType: "Full", // Default insurance type
  insuranceCost: 800, // Example insurance cost in euros per year
  taxes: 150, // Example yearly taxes in euros
  totalPlannedKMs: 15000, // Example total planned kilometers per year
  fuelConsumption: 6, // Example fuel consumption in liters per 100 km
  offerOnExtendedWarranty: false, // Default to not offering extended warranty
  extendedWarrantyCost: undefined, // No cost associated initially
  fuelType: "Petrol",
  averageFuelCost: 0,
  tco: 0,
  truePurchasePrice: 0,
  totalInterestPaid: 0,
  plannedYearsOfOwnership: 1,
};
