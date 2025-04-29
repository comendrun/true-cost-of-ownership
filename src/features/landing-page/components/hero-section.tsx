'use client'
import React from 'react'
import LandingPageNavbar from '@/features/landing-page/components/navbar'
import { Button } from '@/components/ui/button'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { motion } from 'framer-motion'

const HeroSection = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 2 }}
    >
      <div className="flex flex-col gap-4 max-w-[40rem]">
        <div className="flex gap-2 items-end">
          <p className="text-3xl font-semibold">
            AutoMon - Discover the True Cost of Car Ownership — It&#39;s<ContainerTextFlip
            words={['Free', 'Easy', 'Fast', 'Smart']}
            className="text-md" />
          </p>

        </div>
        <p className="md:max-w-[70%]">
          Add the car that you are tracking in seconds and let AutoMon&#39;s AI show you the real-world costs, hidden
          expenses and comparisons.
        </p>
        <div className="flex gap-2 items-center mt-5">
          <Button asChild variant="default">
            <a href={`${isAuthenticated ? '/dashboard/add-car' : '/auth/login'}`}>Get Started</a>
          </Button>
          <p>It&#39;s FREE</p>
        </div>
      </div>
    </motion.section>
  )
}

export default HeroSection