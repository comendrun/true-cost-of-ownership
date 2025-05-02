'use client'
import React from 'react'
import LandingPageSection from '@/features/landing-page/components/landing-page-section'
import { LinkPreview } from '@/components/ui/link-preview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const BottomCallToActionSection = () => {
  return (
    <LandingPageSection className="flex justify-between items-center gap-2 px-5 max-w-3xl w-full m-5 min-h-[20vh]">
      <p className="text-lg md:text-2xl flex gap-3 flex-col md:flex-row md:items-center">
        <span className="">AutoMon</span> <span className="">- by <LinkPreview url="https://comendrun.com"
                                                                               className="font-semibold">comendrun</LinkPreview></span>
      </p>
      <div className="flex gap-2 flex-col md:flex-row items-center justify-center ">
        <Button className="w-full text-xs md:text-md " asChild>
          <Link href="/dashboard">
            Get Started
          </Link>
        </Button>
        <Button variant="outline" size="default" className="w-full h-full text-xs md:text-md" asChild>
          <a href="https://comendrun.com">
            My Website
          </a>
        </Button>
      </div>
    </LandingPageSection>
  )
}

export default BottomCallToActionSection