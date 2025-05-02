import React from 'react'
import LandingPageNavbar from '@/features/landing-page/components/navbar'
import { createClient } from '@/utils/supabase/server'
import { LandingPageHeroSection } from '@/features/landing-page/components/hero-section'
import HowItWorksSection from '@/features/landing-page/components/how-it-works'
import FaqSection from '@/features/landing-page/components/faq-section'
import BottomCallToAction from '@/features/landing-page/components/bottom-call-to-action'
import Footer from '@/features/landing-page/components/footer'

export default async function LandingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAuthenticated = (user && user.aud === 'authenticated') || false

  return (
    <section className="relative mx-auto my-10 flex max-w-8xl flex-col items-center justify-center">
      {/*<section className="font-sans flex flex-col gap-20">*/}

      {/* Navbar */}
      <LandingPageNavbar isAuthenticated={isAuthenticated} />

      {/*  Hero  Section */}
      {/*<HeroSection isAuthenticated={isAuthenticated} />*/}
      <LandingPageHeroSection isAuthenticated={isAuthenticated} />

      {/* How it Works */}
      <HowItWorksSection />

      {/*  Featured Comparisons */}


      {/* FAQ*/}
      <FaqSection />

      {/*  Final Call to Action */}
      <BottomCallToAction />

      {/* Footer */}
      <Footer />
    </section>
  )
}
