import React, { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginTab from './_components/login-tab'
import RegisterTab from './_components/register-tab'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'

export default async function AuthLayout({
  children
}: {
  children: ReactNode
}) {
  const supabse = createClient()

  const {
    data: { user }
  } = await supabse.auth.getUser()

  if (user?.aud === 'authenticated') {
    return (
      <div className='flex flex-col items-center justify-center gap-2'>
        <p>You are already Authenticated!</p>
        <Link href='/dashboard'>
          <Button>Take me to dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    // <div className='flex min-h-[50vh] w-full items-center justify-center border-2 border-white'>
    //   {children}
    // </div>

    <div className='m-auto flex h-full w-full items-center justify-center'>
      <Tabs defaultValue='login' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger className='p-0' value='login'>
            <Link className='h-full w-full px-3 py-1' href='/auth/login'>
              Login
            </Link>
          </TabsTrigger>
          <TabsTrigger className='p-0' value='register'>
            <Link className='h-full w-full px-3 py-1' href='/auth/register'>
              Register
            </Link>
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value='login'>
          <LoginTab />
        </TabsContent>

        <TabsContent value='register'>
          <RegisterTab />
        </TabsContent> */}
        {children}
      </Tabs>
    </div>
  )
}
