'use server'
import React, { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import TabsClient from './_components/tab-client'
import { redirect } from 'next/navigation'

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
    // return (
    //   <div className='flex flex-col items-center justify-center gap-2'>
    //     <p>You are already Authenticated!</p>
    //     <Link href='/dashboard'>
    //       <Button>Take me to dashboard</Button>
    //     </Link>
    //   </div>
    // )
  }

  return (
    <div className='m-auto flex min-h-screen w-full items-center justify-center border-2 border-blue-400'>
      <TabsClient>{children}</TabsClient>
    </div>
  )
}
