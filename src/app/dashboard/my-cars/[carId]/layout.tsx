'use server'
import React, { ReactNode } from 'react'

export default async function layout({
  params,
  children
}: {
  params: { carId: number }
  children: ReactNode
}) {
  const { carId } = params

  return <>{children}</>
}
