'use client'
import SimpleForm from '@/features/add-car/components/simple-form'
import React from 'react'

export default function CarsPage() {
  return (
    // <div className='flex flex-col items-center justify-center gap-5 lg:grid lg:grid-cols-3'>
    //   <div className='col-span-2'></div>
    //   <div className='col-span-1 flex h-full w-full'>Simple Form</div>
    // </div>
    // <div className='flex flex-col items-center justify-center gap-5'>Simple Form</div>
    <div className='min-h-max max-w-full flex-1 rounded-xl bg-muted/50 p-5'>
      {/* a navigation button to go through the questions */}

      <SimpleForm />
    </div>
  )
}
