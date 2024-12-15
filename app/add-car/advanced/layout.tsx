import React, { ReactNode } from 'react'
import CarExpensesSection from '../_components/car-expenses-section'

export default function AdvancedFormLayout({
  children
}: {
  children: ReactNode
}) {
  return <div className='flex w-full flex-col'>{children}</div>
}
