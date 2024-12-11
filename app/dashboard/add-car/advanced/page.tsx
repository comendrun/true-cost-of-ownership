'use client'
import React from 'react'
import CarForm from '../_components/car-form'
import CarExpensesSection from '../_components/car-expenses-section'
import { usePathname } from 'next/navigation'

export default function CarsPage() {
  const pathname = usePathname()
  const currentPath = pathname.split('/').pop()

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <CarForm />

      </div>
      <div className='col-span-1 flex h-full w-full'>
        <CarExpensesSection />
      </div> */}
    </div>
  )
}
// import { redirect } from 'next/navigation'

// export default function AdvancedFormRedirect() {
//   redirect('/dashboard/add-car/advanced/first-step')
// }
