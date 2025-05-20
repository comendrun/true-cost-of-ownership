'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { registerSchema } from '../../types/auth-form.types'

export async function login(formData: FormData) {
  const supabase = createClient()

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
  redirect('/dashboard')
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
  }

  const username = parsed.data.username

  const { data: dbUserNames, error: getUserProfilesError } = await supabase
    .from('usernames')
    .select('*')
    .eq('username', username)

  console.log('dbUsernames', dbUserNames)
  if (getUserProfilesError) {
    return {
      message:
        'There was an error while trying to create the new User. Please try again later.',
      isFailed: true
    }
  }

  if (dbUserNames.length > 0) {
    return {
      message: 'The Username already exists',
      isFailed: true
    }
  }

  const payload = {
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        username
      }
    }
  }

  const { error } = await supabase.auth.signUp(payload)

  if (error) {
    return {
      message: error.message,
      isFailed: true
    }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/dashboard', 'layout')
  return {
    message: 'The Sign up Process was successful. you will be redirected soon.',
    isFailed: false
  }
}
