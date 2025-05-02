'use client'
import React from 'react'
import LandingPageSection from '@/features/landing-page/components/landing-page-section'
import LandingPageSectionAnimatedHeaders from '@/features/landing-page/components/LandingPageSectionAnimatedHeaders'
import { LinkPreview } from '@/components/ui/link-preview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const BottomCallToActionSection = () => {
  return (
    <LandingPageSection className="flex justify-between items-center gap-2 max-w-3xl w-full m-5 min-h-[20vh]">
      <p className="text-2xl">
        <span className="">AutoMon</span> - by <LinkPreview url="https://comendrun.com"
                                                            className="font-semibold">comendrun</LinkPreview>
      </p>
      <div className="flex gap-2 flex-col md:flex-row items-center justify-center ">
        <Button className="w-full ">
          <Link href="/dashboard">
            Get Started
          </Link>
        </Button>
        <Button variant="outline" size="default" className="w-full h-full">
          <a href="https://comendrun.com">
            Check out my Website
          </a>
        </Button>
      </div>
    </LandingPageSection>
  )
}

export default BottomCallToActionSection