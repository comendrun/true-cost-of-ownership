import React from 'react'
import { Button } from '@/components/ui/button'

function LandingPageNavbar() {
  return (
    <nav className='flex flex-row gap-2 justify-between items-center'>

    {/*  logo and the name */}
      <div>
        <p className='text-xl font-semibold'>
          AutoMon
        </p>
      </div>

    {/*  links */}
      <div>
        <Button variant='link' >
          <a href='https://www.comendrun.com/' target='_blank'>comendrun</a>
        </Button>
      </div>


    {/*  auth section  */}
      <div className='flex gap-2 '>
        <Button variant='ghost' >Login</Button>
        <Button variant='default' >Sign Up</Button>
      </div>
    </nav>
  )
}

export default LandingPageNavbar