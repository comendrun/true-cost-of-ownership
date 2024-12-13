'use client'
import { logUserOut } from '@/app/actions'
import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './ui/providers/theme-toggle'

export default function Navbar() {
  return (
    <div className='mb-10 flex items-center justify-between'>
      <div>
        <p className='text-xl font-bold'>Cars TCO</p>
      </div>
      <div className='flex items-center gap-2'>
        <Link href='/dashboard'>
          <Button>Dashboard</Button>
        </Link>

        <button onClick={() => logUserOut()} className='shadcn-button'>
          Logout
        </button>

        <ModeToggle />
      </div>
    </div>
  )
}
