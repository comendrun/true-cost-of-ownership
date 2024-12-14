'use client'
import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signup } from '../actions'
import { useState } from 'react'
import { registerSchema } from '../_types/types'
import { RegisterForm } from '../_components/register-tab'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      )
      await signup(formData)
    } catch (error) {
      console.error('The was an error registering the user', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onRegisterHandler)}
        className='flex h-full w-full flex-col'
      >
        <FormField
          control={control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email Address</FormLabel>

                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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

        <Button className='mt-4' disabled={isLoading}>
          {isLoading ? 'Please wait ...' : 'Register'}
        </Button>
        {registerActionMessage ? (
          <div className='mt-2 text-sm text-red-600'>
            {registerActionMessage}
          </div>
        ) : (
          <></>
        )}
      </form>
    </Form>
  )
}
