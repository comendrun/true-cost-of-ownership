'use client'
/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import { ThemeToggleButton } from '@/components/ui/providers/theme-toggle-button'
import Link from 'next/link'

function LandingPageNavbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  // return <Navbar  />
  return (
    // <nav className="flex flex-row items-center justify-between gap-2">
    <nav
      className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">

      {/*  logo and the name */}
      <Link href="/" className="flex h-max w-max items-center gap-2">
        <img
          src="/assets/Logo-idea-cropped.png"
          alt="logo"
          className="flex size-16 items-center justify-between overflow-hidden rounded-full "
        />
        {/*<p className="text-xl font-semibold">AutoMon</p>*/}
        <h1 className="text-base font-bold md:text-2xl">AutoMon</h1>
      </Link>

      {/*  links */}
      <div>
        <Button variant="link">
          <a href="https://www.comendrun.com/" target="_blank">
            comendrun
          </a>
        </Button>
      </div>

      {/*  auth section  */}
      <div className="flex gap-3">
        <ThemeToggleButton />
        {isAuthenticated ? (
          <Button variant="default">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button variant="ghost">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="default">
              <Link href="/auth/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default LandingPageNavbar


