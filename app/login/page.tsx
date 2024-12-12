'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import AuthenticationTabs from './_components/auth-tabs'

const loginSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid Email Address.'
  }),
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

export type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue
  } = form

  const onLoginSubmitHandler: SubmitHandler<LoginForm> = data => {
    console.log('data', data)
  }

  return (
    <div className='m-auto flex h-full w-full items-center justify-center'>
      <Form {...form}>
        <form onSubmit={handleSubmit(onLoginSubmitHandler)}>
          <AuthenticationTabs />
        </form>
      </Form>
    </div>
  )
}
