import { COUNTRIES, CURRENCIES } from '@/data/app.consts'
import z from 'zod'

export const UserSettingsSchema = z.object({
  email: z.string().trim().email().optional(),
  username: z
    .string()
    .trim()
    .min(4, 'The username should at least be 4 characters long')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username must not contain spaces or special characters'
    )
    .optional(),
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
  // config: UserConfigSchema
  preferredCurrency: z.enum(CURRENCIES).optional(),
  preferredCountry: z.enum(COUNTRIES).optional()
})

export type UserSettingsFields = z.infer<typeof UserSettingsSchema>
