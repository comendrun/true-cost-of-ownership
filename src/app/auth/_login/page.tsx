'use client'
import { Button } from '@/components/ui/button'
import { login, signup } from '../actions'
import { Schema, z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
} from '@/components/ui/form'
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
    <div className='m-auto flex h-full w-full justify-center items-center'>
      <Form {...form}>
        <form onSubmit={handleSubmit(onLoginSubmitHandler)}>
          {/* <div>
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
                  
                  <Button>Log in</Button>
                  </div> */}
          <AuthenticationTabs />
        </form>
      </Form>
    </div>
  )
}

//   return (
//     <form className='m-auto flex max-w-[600px] flex-col gap-2 p-2'>
//       <div className='my-4 flex flex-col'>
//         <label className='flex flex-col gap-2'>
//           <span>Email:</span>
//           <input
//             className='flex px-2 py-4'
//             id='email'
//             name='email'
//             type='email'
//             required
//           />
//         </label>
//         <label className='flex flex-col gap-2'>
//           <span>Password:</span>
//           <input
//             className='flex px-2 py-4'
//             id='password'
//             name='password'
//             type='password'
//             required
//           />
//         </label>
//       </div>
//       <div className='flex flex-col gap-2'>
//         <Button className='flex w-full px-2 py-4' formAction={login}>
//           Log in
//         </Button>
//         <Button
//           variant='secondary'
//           className='flex w-full px-2 py-4'
//           formAction={signup}
//         >
//           Sign up
//         </Button>
//       </div>
//     </form>
//   )
// }
