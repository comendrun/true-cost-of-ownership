import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function DashboardPage() {
  return (
    <div className='mx-auto flex items-center gap-4'>
      <Link href='/dashboard/add-car'>
        <Button>Add a New Car</Button>
      </Link>
      <Link href='/dashboard/my-cars'>
        <Button variant='outline' className=''>
          Check all your Cars
        </Button>
      </Link>
    </div>
  )
}
