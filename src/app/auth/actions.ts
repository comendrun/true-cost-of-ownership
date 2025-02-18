'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { registerSchema } from './_types/types'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  console.log('error message', error?.message)
  console.log('error cause', error?.cause)
  console.table(error)

  if (error) {
    redirect(`/auth/login?message=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(submittedData: FormData): Promise<{
  message: string
  isFailed: boolean
}> {
  const supabase = createClient()

  const formData = Object.fromEntries(submittedData)
  const parsed = registerSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      message: 'The submitted fields are not correct.',
      isFailed: true
    }
    // redirect(`/auth/register?message=The Submitted data is not valid`)
  }

  console.log('parsed', parsed)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const payload = {
    email: parsed.data.email,
    password: parsed.data.password,
    // username: formData.get('username') as string
    options: {
      data: {
        username: parsed.data.username
      }
    }
  }

  const { error } = await supabase.auth.signUp(payload)

  if (error) {
    // redirect(`/auth/register?message=${error.message}`)
    return {
      message: error.message,
      isFailed: true
    }
  }

  revalidatePath('/', 'layout')
  return {
    message: 'The Sign up Process was successful. you will be redirected soon.',
    isFailed: false
  }

  // revalidatePath('/', 'layout')
  // redirect('/')
}
