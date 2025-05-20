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
import CircularSpinner from '@/components/ui/loading/spinner'
import { useUserStore } from '@/hooks/users.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginForm } from '@/features/auth/components/login-tab'
import { login } from '@/features/auth/server/actions/auth.server.actions'
import { loginSchema } from '@/features/auth/types/auth-form.types'

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

  const localStoredUser = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  if (localStoredUser) {
    setUser(null)
  }

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
