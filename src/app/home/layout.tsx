import React from 'react'

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container w-full mx-auto p-5 h-full'>
      {children}
    </div>
  )
}
