'use client'
import React from 'react'
import LandingPageSection from '@/features/landing-page/components/landing-page-section'
import { LinkPreview } from '@/components/ui/link-preview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const BottomCallToActionSection = () => {
  return (
    <LandingPageSection className='m-5 my-10 mt-20 flex min-h-[20vh] w-full max-w-3xl items-center justify-between gap-2 px-5'>
      <p className='flex flex-col gap-3 text-lg md:flex-row md:items-center md:text-2xl'>
        <span className=''>AutoMon</span>{' '}
        <span className=''>
          - by{' '}
          <LinkPreview url='https://comendrun.com' className='font-semibold'>
            comendrun
          </LinkPreview>
        </span>
      </p>
      <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
        <Button className='md:text-md w-full text-xs' asChild>
          <Link href='/dashboard'>Get Started</Link>
        </Button>
        <Button
          variant='outline'
          size='default'
          className='md:text-md h-full w-full text-xs'
          asChild
        >
          <a href='https://comendrun.com'>My Website</a>
        </Button>
      </div>
    </LandingPageSection>
  )
}

export default BottomCallToActionSection
