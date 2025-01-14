import React, { ReactNode } from 'react'

export default function AdvancedFormLayout({
  children
}: {
  children: ReactNode
}) {
  return <div className='flex w-full flex-col'>{children}</div>
}
