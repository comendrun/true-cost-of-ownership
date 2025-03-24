import { COUNTRIES } from '@/data/app.consts'
import { z } from 'zod'

export const SimpleFormFieldsSchema = z.object({
  brand: z
    .string()
    .min(1, { message: 'Please select a car brand from the list.' }),
  model: z
    .string()
    .min(1, { message: 'Please select a car model from the list.' }),
  year: z.number(),
  mileage: z.number(), // KM
  fuelType: z.enum([
    'Diesel',
    'Petrol',
    'Hybrid/Diesel',
    'Hybrid/Petrol',
    'Electric'
  ]),
  purchasePrice: z
    .number()
    .min(500, { message: 'Purchase price must be at least 500 euros.' }), // euros
  prepayment: z
    .number()
    .min(500, { message: 'Prepayment must be at least 500 euros' }), // euros
  plannedYearsOfOwnership: z.number().min(1),

  driverAgeRange: z.enum(['18-25', '25-35', '35-55', '55+']),
  drivingExperienceYears: z
    .number()
    .min(0, 'The years of experience cannot be negative.'),
  country: z.enum(COUNTRIES).default(COUNTRIES[0])
})

export const SimpleFormCarInfoSchema = SimpleFormFieldsSchema.pick({
  brand: true,
  model: true,
  mileage: true,
  fuelType: true,
  year: true
})

export const SimpleFormFinancialInfoSchema = SimpleFormFieldsSchema.pick({
  purchasePrice: true,
  prepayment: true,
  plannedYearsOfOwnership: true
}).refine(data => data.prepayment <= data.purchasePrice, {
  message: 'Prepayment cannot be greater than the purchase price.',
  path: ['prepayment']
})

export const SimpleFormDriverInfoSchema = SimpleFormFieldsSchema.pick({
  driverAgeRange: true,
  drivingExperienceYears: true,
  country: true
})
