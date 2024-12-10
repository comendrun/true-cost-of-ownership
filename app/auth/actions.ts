'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

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

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string
  }

  const { error } = await supabase.auth.signUp(data)

  console.log('error message', error?.message)
  console.log('error cause', error?.cause)
  console.table(error)
  

  if (error) {
    redirect(`/auth/register?message=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
