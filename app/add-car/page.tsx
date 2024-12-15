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
        <div className='flex h-full w-full gap-2'>
          <Link
            className='flex aspect-square w-full items-center justify-center rounded border p-8 text-center text-xl text-primary transition hover:bg-blue-700 hover:text-secondary '
            href='/add-car/simple'
          >
            Simple Form
          </Link>

          <Link
            className='flex aspect-square w-full items-center justify-center rounded bg-blue-700 p-8 text-center text-xl text-secondary transition hover:opacity-80'
            href='/add-car/advanced'
          >
            Advanced Form
          </Link>
          {/* <Button variant='secondary' className='mx-auto flex w-full px-2 py-8'>
          </Button>
          <Button className='mx-auto flex w-full px-2 py-8'>
          </Button> */}
        </div>
      </div>
    </div>
  )
}
