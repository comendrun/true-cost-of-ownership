'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginTab from './_components/login-tab'
import RegisterTab from './_components/register-tab'
import { redirect, usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { UserResponse } from '@supabase/supabase-js'

export default function AuthenticationPage({
  children
}: {
  children: ReactNode
}) {
  const [mysession, setMySession] = useState<UserResponse | undefined>()
  const pathname = usePathname()
  const supabase = createClient()
  useEffect(() => {
    supabase.auth.getUser().then(session => {
      console.log('session in the useEffect', session)

      // do something here with the session like  ex: setState(session)
      setMySession(session)
    })
  }, [])

  redirect('/auth/login')

  return (
    // <div className='m-auto flex h-full w-full items-center justify-center'>
    //   <Tabs defaultValue='login' className='w-[400px]'>
    //     <TabsList className='grid w-full grid-cols-2'>
    //       <TabsTrigger value='login'>Login</TabsTrigger>
    //       <TabsTrigger value='register'>Register</TabsTrigger>
    //     </TabsList>
    //     <TabsContent value='login'>
    //       <LoginTab />
    //     </TabsContent>

    //     <TabsContent value='register'>
    //       <RegisterTab />
    //     </TabsContent>
    //     <TabsContent value='login'>{children}</TabsContent>
    //   </Tabs>
    // </div>
    <></>
  )
}
