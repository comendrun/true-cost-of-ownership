import { COUNTRIES } from '@/data/app.consts'
import { z } from 'zod'

export const CarFormSchema = z.object({
  // General Information
  name: z.string().nullable().optional(),
  brand: z
    .string()
    .min(1, { message: 'Please select a car brand from the list.' }),
  model: z
    .string()
    .min(1, { message: 'Please select a car model from the list.' }),
  variant: z.string().nullable().optional(),
  year: z.number(),
  mileage: z.number(), // KM
  plannedYearsOfOwnership: z.number().min(1),
  drivingExperienceYears: z
    .number()
    .min(0, 'The years of experience cannot be negative.'),
  driverAgeRange: z.enum(['18-25', '25-35', '35-55', '55+']),
  // Personal Preferences
  interiorScore: z
    .number()
    .min(-5, 'Value must be at least -5')
    .max(5, 'Value must be at most 5')
    .nullable()
    .optional(),
  exteriorScore: z
    .number()
    .min(-5, 'Value must be at least -5')
    .max(5, 'Value must be at most 5')
    .nullable()
    .optional(),
  // Finances
  purchasePrice: z.number(), // euros
  prepayment: z.number(), // euros
  interestRate: z.number().nullable().optional(), // percentage
  financingDuration: z.number().max(10).nullable().optional(), // years
  remainingAmount: z.number().nullable().optional(), // euros
  totalInterestPaid: z.number().nullable().optional(),
  truePurchasePrice: z.number().nullable().optional(),

  // Depreciation
  initialPrice: z.number().nullable().optional(), // euros // the initial price of the vehicle when it was first sold as new
  depreciationRate: z.number().nullable().optional(), // percentage

  // Warranty and Service
  guaranteeYears: z
    .number()
    .min(0, { message: "The Guaranteed years can't be less than 0" })
    .nullable()
    .optional(), // years
  serviceCosts: z.number().nullable().optional(), // euros - this is done annually and regardless of any repairs are due to be paid.
  serviceIncludes: z.string().nullable().optional(), // list of the services
  tiresCosts: z.number().nullable().optional(), // euros, probably similar for different cars
  oilChangeCosts: z.number().nullable().optional(), // euros, as an example of the costs associated to the car
  offerOnExtendedWarranty: z.boolean().nullable().optional(),
  extendedWarrantyCost: z.number().nullable().optional(),

  // Efficiency
  totalPlannedKMs: z.number(), // KMs, total number of KMs planned to drive the car yearly
  fuelConsumption: z.number().nullable().optional(), // liters per 100KM
  fuelType: z.enum([
    'Diesel',
    'Petrol',
    'Hybrid/Diesel',
    'Hybrid/Petrol',
    'Electric'
  ]),
  averageFuelCost: z.number().nullable().optional(),

  // Insurance
  insuranceType: z.enum(['Minimum', 'Partial', 'Full']),
  insuranceCost: z.number().nullable().optional(), // euros, depends on the car

  // Other Costs
  tuvCosts: z.number().nullable().optional(), // euros, probably similar for different cars
  taxes: z.number().nullable().optional(), // yearly
  parkingCosts: z.number().nullable().optional(),

  // Resale Value
  estimatedResaleValue: z.number().nullable().optional(),
  resaleValueAfterYears: z.number().nullable().optional(),

  // Maintenance
  regularMaintenanceCosts: z.number().nullable().optional(),
  unexpectedRepairCosts: z.number().nullable().optional(),
  maintenanceFrequency: z.string().nullable().optional(),

  // Environmental Impact
  emissions: z.number().nullable().optional(),
  ecoTax: z.number().nullable().optional(),

  // Total Cost of Ownership
  tco: z.number().nullable().optional(),
  country: z.enum(COUNTRIES).default(COUNTRIES[0])
})

export const CarFormSchemaOptional = CarFormSchema.partial()

export const CarFormOptionalFieldsSchema = CarFormSchema.pick({
  name: true,
  interestRate: true,
  financingDuration: true,
  remainingAmount: true,
  totalInterestPaid: true,
  truePurchasePrice: true,
  initialPrice: true,
  depreciationRate: true,
  // guaranteeYears: true,
  serviceCosts: true,
  serviceIncludes: true,
  tiresCosts: true,
  oilChangeCosts: true,
  fuelConsumption: true,
  averageFuelCost: true,
  insuranceCost: true,
  tuvCosts: true,
  taxes: true,
  parkingCosts: true,
  estimatedResaleValue: true,
  // resaleValueAfterYears: true,
  regularMaintenanceCosts: true,
  unexpectedRepairCosts: true,
  maintenanceFrequency: true,
  emissions: true,
  ecoTax: true,
  tco: true
}).extend({
  financingDuration: z.number().optional()
  // guaranteeYears: z.number().optional()
})
