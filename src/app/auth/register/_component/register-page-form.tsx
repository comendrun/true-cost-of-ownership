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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { RegisterForm } from '../../_components/register-tab'
import { registerSchema } from '../../_types/types'
import { useUserStore } from '@/lib/users.store'

export default function RegistrationPageForm({
  signup
}: {
  signup(submittedData: FormData): Promise<{
    message: string
    isFailed: boolean
  }>
}) {
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

  const router = useRouter()

  const onRegisterHandler: SubmitHandler<RegisterForm> = async data => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      )

      const { isFailed, message } = await signup(formData)
      if (isFailed) {
        return toast.error(message)
      }
      toast.success(message)
      //   revalidatePath('/', 'layout')
      //   redirect('/')
      router.push('/')
    } catch (error) {
      console.error('The was an error registering the user', error)
    } finally {
      setIsLoading(false)
    }
  }

  const localStoredUser = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  if (localStoredUser) {
    setUser(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onRegisterHandler)}
        className='flex h-full w-full flex-col'
        method='POST'
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
          {isLoading ? (
            <CircularSpinner color='bg-secondary' size={20} />
          ) : (
            'Register'
          )}
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
