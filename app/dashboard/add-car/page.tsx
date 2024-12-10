'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CarsPage() {
  return (
    <div className='m-auto flex h-full max-w-[500px] flex-col items-center justify-center gap-5'>
      <div className='flex h-full w-full flex-col gap-3'>
        <p>
          Please choose a way to calculate the true cost of ownership for a car
          that you have in mind.
        </p>
        <Button variant='secondary' className='mx-auto flex w-full px-2 py-8'>
          <Link className='flex w-full' href='/dashboard/add-car/simple'>
            Simple Form
          </Link>
        </Button>
        <Button className='mx-auto flex w-full px-2 py-8'>
          <Link className='flex w-full' href='/dashboard/add-car/advanced'>
            Advanced Form
          </Link>
        </Button>
      </div>
    </div>
  )
}
