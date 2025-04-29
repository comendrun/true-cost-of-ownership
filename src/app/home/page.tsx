import React from 'react'
import LandingPageNavbar from '@/features/landing-page/components/navbar'
import { Button } from '@/components/ui/button'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { createClient } from '@/utils/supabase/server'
import HeroSection from '@/features/landing-page/components/hero-section'

export default async function LandingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAuthenticated = (user && user.aud === 'authenticated') || false

  return (
    <section className="font-sans flex flex-col gap-20">

      {/* Navbar */}
      <LandingPageNavbar />

      {/*  Hero  Section */}
      <HeroSection isAuthenticated={isAuthenticated} />

      {/* How it Works */}
      <section>

      </section>

      {/*  Featured Comparisons */}
      <section>

      </section>

      {/*  Final Call to Action */}
      <section>

      </section>

      {/* Footer */}
      <footer>

      </footer>
    </section>
  )
}
