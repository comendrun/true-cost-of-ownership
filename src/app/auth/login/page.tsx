'use client'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { login } from '../actions'
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
import { useState } from 'react'
import { loginSchema } from '../_types/types'
import { LoginForm } from '../_components/login-tab'
import CircularSpinner from '@/components/ui/loading/spinner'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      )
      const loginResult = await login(formData)
    } catch (error) {
      console.error('there was an error while trying to log in the user', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onLoginSubmitHandler)}
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

        <Button className='mt-4' disabled={isLoading}>
          {isLoading ? (
            <CircularSpinner color='bg-secondary' size={20} />
          ) : (
            'Login'
          )}
        </Button>
        {loginActionMessage ? (
          <div className='mt-2 text-sm text-red-600'>{loginActionMessage}</div>
        ) : (
          <></>
        )}
      </form>
    </Form>
  )
}
