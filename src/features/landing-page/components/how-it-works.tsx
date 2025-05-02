'use client'
import React from 'react'
import { GlowingEffect, GlowingEffectCards } from '@/components/ui/glowing-effect'
import { cn } from '@/lib/utils'
import LandingPageSection from '@/features/landing-page/components/landing-page-section'
import { motion } from 'framer-motion'
import LandingPageSectionAnimatedHeaders from '@/features/landing-page/components/LandingPageSectionAnimatedHeaders'

const words = 'How it works'.split(' ')


const HowItWorksSection = () => {
  return (
    <LandingPageSection>
      <LandingPageSectionAnimatedHeaders text="How it works" />
      <GlowingEffectCards />
    </LandingPageSection>

  )
}

export default HowItWorksSection