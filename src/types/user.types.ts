import { COUNTRIES, CURRENCIES } from '@/data/app.consts'
import { z } from 'zod'
import { UserProfile } from './db.types'

export const UserConfigSchema = z.object({
  preferredCurrency: z.enum(CURRENCIES).optional(),
  preferredCountry: z.enum(COUNTRIES).optional()
})

export type UserConfig = z.infer<typeof UserConfigSchema>

export type UserProfileResponseData = {
  error: string | null
  user?: UserProfile
}
