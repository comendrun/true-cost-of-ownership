'use client'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { TabsContent } from '@radix-ui/react-tabs'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { login } from '../actions'

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
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { UserResponse } from '@supabase/supabase-js'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid Email Address.'
  }),
  password: z.string().trim()
  // .min(8, 'Password must be at least 8 characters long')
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .regex(/[0-9]/, 'Password must contain at least one number')
  // .regex(
  //   /[^a-zA-Z0-9]/,
  //   'Password must contain at least one special character'
  // )
})

export type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const searchParams = useSearchParams()
  const loginActionMessage = searchParams.get('message')

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

  const onLoginSubmitHandler: SubmitHandler<LoginForm> = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))
    ;('use server')
    const loginResult = await login(formData)
    console.log('loginResult', loginResult)
  }

  return (
    <TabsContent value='login'>
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

                <Button className='mt-4'>Login</Button>
                {loginActionMessage ? (
                  <div className='mt-2 text-sm text-red-600'>
                    {loginActionMessage}
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
