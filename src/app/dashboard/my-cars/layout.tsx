import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function MyCarsLayout({ children }: { children: ReactNode }) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return <>{children}</>
}
