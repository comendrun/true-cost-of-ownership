import React, { ReactNode } from 'react'

export default function SimpleFormLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className='m-auto flex h-full min-h-max w-full items-center justify-center rounded-xl bg-muted/50 p-10'>
      {children}
    </div>
  )
}
