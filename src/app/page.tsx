import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user?.aud === 'authenticated') {
    console.log("The User is authenticated! redirecting to the /dashboard")
    redirect('/dashboard')
  } else {
    console.log("The User is not Authenticated! Redirecting to the /home page")
    redirect('/home')
  }
  return (
    <div className='mx-auto flex items-center gap-4'>
      {/* <Link href='/add-car'>
        <Button>Add a New Car</Button>
      </Link>
      <Link href='/my-cars'>
        <Button variant='outline' className=''>
          Check all your Cars
        </Button>
      </Link> */}
      Home
    </div>
  )
}
