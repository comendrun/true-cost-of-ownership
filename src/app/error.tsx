'use client'
import ErrorPage from '@/components/ui/page-components/error-page-component'
import React from 'react'

export default function error() {
  return (
    <ErrorPage
      bounce={false}
      buttonTitle='Go to Dashboard'
      title='Oops, There was an Error'
      description=''
      href='/dashboard'
    />
  )
}
