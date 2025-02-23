import { COUNTRIES, CURRENCIES } from '@/consts/app-constants'
import z from 'zod'

export const UserConfigSchema = z.object({
  preferredCurrency: z.nativeEnum(CURRENCIES),
  preferredCountry: z.enum(COUNTRIES)
})

export const UserProfileSchema = z.object({
  email: z.string().trim().email(),
  username: z
    .string()
    .trim()
    .min(4, 'The username should at least be 4 characters long')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username must not contain spaces or special characters'
    ),
  firstName: z
    .string()
    .trim()
    .min(2, 'The first name should be at least 2 Characters.')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'The last name should be at least 2 Characters.')
    .optional(),
  config: UserConfigSchema
})

export type UserConfig = z.infer<typeof UserConfigSchema>

export type UserProfile = z.infer<typeof UserProfileSchema>
