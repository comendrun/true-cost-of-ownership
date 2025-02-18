'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const logUserOut = async () => {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const signUserOut = await supabase.auth.signOut()

  redirect('/auth')
}
