'use client'
/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import { ThemeToggleButton } from '@/components/ui/providers/theme-toggle-button'
import Link from 'next/link'
import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@heroui/navbar'

function LandingPageNavbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  // return <Navbar  />
  return (
    // <nav className="flex flex-row items-center justify-between gap-2">
    <>
      <nav
        className="hidden md:flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">

        {/*  logo and the name */}
        <Link href="/" className="flex h-max w-max items-center gap-2">
          <img
            src="/assets/Logo-idea-cropped.png"
            alt="logo"
            className="flex size-6 md:size-16 items-center justify-between overflow-hidden rounded-full "
          />
          {/*<p className="text-xl font-semibold">AutoMon</p>*/}
          <h1 className="text-base font-bold md:text-2xl">AutoMon</h1>
        </Link>

        {/*  links */}
        <div className="hidden md:flex">
          <Button variant="link">
            <a href="https://www.comendrun.com/" target="_blank">
              Kamran Rouhani
            </a>
          </Button>
        </div>

        {/*  auth section  */}
        <div className="hidden md:flex gap-3">
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

        {/*  mobile nav */}
      </nav>
      <MobileNav isAuthenticated={isAuthenticated} />
    </>
  )
}

export default LandingPageNavbar

const MobileNav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Navbar className="flex md:hidden" onMenuOpenChange={setMobileMenuOpen}>
      <NavbarContent>

        <NavbarBrand>
          <Link href="/" className="flex h-max w-max items-center gap-2">
            <img
              src="/assets/Logo-idea-cropped.png"
              alt="logo"
              className="flex size-6 md:size-16 items-center justify-between overflow-hidden rounded-full "
            />
            <h1 className="text-base font-bold md:text-2xl">AutoMon</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex lg:hidden">
          <ThemeToggleButton />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu className="mt-14">
        {isAuthenticated ? (
          <NavbarMenuItem key={`dashboard`}>
            <Button asChild variant="default">
              <Link className="flex w-full" href="/dashboard">Dashboard</Link>
            </Button>
          </NavbarMenuItem>
        ) : (
          <div className="flex flex-col gap-4">
            <NavbarMenuItem key={`login`}>
              <Button asChild variant="outline">
                <Link className="flex w-full" href="/auth/login">Login</Link>
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem key={`register`}>
              <Button asChild variant="default">
                <Link className="flex w-full" href="/auth/register">Register</Link>
              </Button>
            </NavbarMenuItem>
          </div>
        )}
      </NavbarMenu>

    </Navbar>
  )
}

