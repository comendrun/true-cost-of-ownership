import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid Email Address.'
  }),
  username: z
    .string()
    .trim()
    .min(4, 'The username should at least be 4 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain spaces or special characters'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    )
})

export type RegistrationForm = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid Email Address.'
  }),
  password: z.string().trim()
})

export type LoginForm = z.infer<typeof loginSchema>
