import React, { ReactNode } from 'react'

const LandingPageSection = (
  {
    children,
    className = 'min-h-[60vh] m-5 flex flex-col justify-center items-center'
  }:
  {
    children: ReactNode
    className?: string
  }) => {
  return (
    <section className={` ${className}`}>
      {children}
    </section>
  )
}

export default LandingPageSection