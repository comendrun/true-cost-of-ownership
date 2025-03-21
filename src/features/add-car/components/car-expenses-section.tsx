'use client'
import { Button } from '@/components/ui/button'
import { useCarFormStore } from '@/features/add-car/hooks/cars-store'
import React from 'react'

export default function CarExpensesSection() {
  const values = useCarFormStore(state => state.carFormValues)
  const setCarFormFieldValue = useCarFormStore(
    state => state.setCarFormFieldValue
  )

  console.log('store values', values)
  // console.log('setCarFormFieldValue', setCarFormFieldValue('Hello'))

  return (
    <div className='m-auto mt-5 flex w-full flex-col gap-8 divide-y-2 border p-5'>
      <h2 className='text-xl font-bold'>Expenses</h2>
      <Button
        onClick={e => {
          setCarFormFieldValue('purchasePrice', 25000)
        }}
      >
        Increase the car price
      </Button>
    </div>
  )
}
