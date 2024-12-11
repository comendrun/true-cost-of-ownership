import React, { ReactNode } from 'react'
import CarExpensesSection from '../_components/car-expenses-section'

export default function AdvancedFormLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className='flex w-full flex-col'>
      {/* STEPPER COMPONENT */}
      <div className='col-span-2'>
        {/* <CarForm /> */}
        {children}
      </div>
      {/* <div className='col-span-1 flex h-full w-full'>
        <CarExpensesSection />
      </div> */}
    </div>
  )
}
