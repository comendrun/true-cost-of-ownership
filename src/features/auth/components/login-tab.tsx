import { Button } from '@/components/ui/button'
import { Schema, z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BaseSyntheticEvent } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

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

export default function LoginTab() {
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
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please Login to CTCO using your account information.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onLoginSubmitHandler)}>
            <div>
              <FormField
                control={control}
                name='email'
                render={field => {
                  return (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>

                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>

                      <FormDescription></FormDescription>
                      <FormMessage>{errors?.email?.message}</FormMessage>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={control}
                name='password'
                render={field => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>

                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>

                      <FormDescription></FormDescription>
                      <FormMessage>{errors?.password?.message}</FormMessage>
                    </FormItem>
                  )
                }}
              />

              <Button className='mt-4'>Login</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
