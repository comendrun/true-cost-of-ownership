'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
import { TabsContent } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signup } from '../actions'

const registerSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid Email Address.'
  }),
  username: z
    .string()
    .trim()
    .min(4, 'The username should at least be 4 characters long'),
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

export type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const registerActionMessage = searchParams.get('message')

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue
  } = form

  const onRegisterHandler: SubmitHandler<RegisterForm> = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    ;('use server')
    await signup(formData)
  }

  return (
    <TabsContent value='register'>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            You don&apos;t have an account? Create your new account now to save
            the researched Cars.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <Form {...form}>
            <form onSubmit={handleSubmit(onRegisterHandler)}>
              <div>
                <FormField
                  control={control}
                  name='email'
                  render={({ field }) => {
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
                  name='username'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type='text' {...field} />
                        </FormControl>

                        <FormDescription>
                          Please choose a valid Username for your account.
                        </FormDescription>
                        <FormMessage>{errors?.username?.message}</FormMessage>
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={control}
                  name='password'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>

                        <FormControl>
                          <Input type='password' {...field} />
                        </FormControl>

                        <FormDescription></FormDescription>
                        <FormMessage>{errors?.password?.message}</FormMessage>
                      </FormItem>
                    )
                  }}
                />

                <Button className='mt-4'>Register</Button>
                {registerActionMessage ? (
                  <div className='mt-2 text-sm text-red-600'>
                    {registerActionMessage}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
