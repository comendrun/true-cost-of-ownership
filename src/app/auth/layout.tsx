'use server'
import TabsClient from '@/features/auth/components/tab-client'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AuthLayout({
  children
}: {
  children: ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user?.aud === 'authenticated') {
    redirect('/dashboard')
  }

  return (
    <div className='m-auto flex min-h-screen w-full items-center justify-center'>
      <TabsClient>{children}</TabsClient>
    </div>
  )
}
