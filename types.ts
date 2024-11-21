import { z } from "zod";

export const carFormSchema = z.object({
  brand: z
    .string()
    .min(1, { message: "Please select a car brand from the list." }),
  model: z
    .string()
    .min(1, { message: "Please select a car model from the list." }),
  variant: z.string().optional(),
  year: z.number(),
  mileage: z.number(), // KM
  interiorScore: z
    .number()
    .min(1, "Value must be at least 1")
    .max(10, "Value must be at most 10")
    .optional(),
  exteriorScore: z
    .number()
    .min(1, "Value must be at least 1")
    .max(10, "Value must be at most 10")
    .optional(),
  purchasePrice: z.number(), // euros
  prepayment: z.number(), // euros
  remainingAmount: z.number(), // euros
  interestRate: z.number(), // percentage
  financingDuration: z.number().max(10), // years
  initialPrice: z.number(), // euros
  depreciationRate: z.number().optional(), // percentage
  guaranteeYears: z.number(), // years
  serviceCosts: z.number(), // euros
  serviceIncludes: z.string(), // list of the services
  tiresCosts: z.number(), // euros, probably similar for different cars
  tuvCosts: z.number(), // euros, probably similar for different cars
  oilChangeCosts: z.number(), // euros, as an example of the costs associated to the car
  insuranceType: z.enum(["Minimum", "Partial", "Full"]),
  insuranceCost: z.number(), // euros, depends on the car
  taxes: z.number(), // yearly
  totalPlannedKMs: z.number(), // KMs, total number of KMs planned to drive the car yearly
  fuelConsumption: z.number(), // liters per 100KM
  offerOnExtendedWarranty: z.boolean().optional(),
  extendedWarrantyCost: z.number().optional(),
  fuelType: z.enum([
    "Diesel",
    "Petrol",
    "Hybrid/Diesel",
    "Hybrid/Petrol",
    "Electric",
  ]),
  averageFuelCost: z.number(),
  tco: z.number(),
  truePurchasePrice: z.number(),
  totalInterestPaid: z.number(),
  plannedYearsOfOwnership: z.number().min(1),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
