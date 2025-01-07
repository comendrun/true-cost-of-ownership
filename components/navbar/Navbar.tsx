'use client'
import { User } from '@supabase/supabase-js'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { ModeToggle } from '../ui/providers/theme-toggle'
import UserNavAvatar from './user-avatar'

export default function Navbar({ user }: { user: User | null }) {
  const isAuthenticated = user?.aud === 'authenticated'

  return (
    <div className='mb-10 flex items-center justify-between gap-6'>
      <Link className='text-xl font-bold' href='/'>
        AutoMon
      </Link>

      {isAuthenticated ? (
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='hidden items-center gap-4 md:flex'>
            <NavbarLink href='/my-cars'>My Cars</NavbarLink>
            <NavbarLink href='/add-car'>Add a New Car</NavbarLink>
          </div>
          <div className='ml-auto flex items-center gap-2'>
            <ModeToggle />
            <UserNavAvatar />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export const NavbarLink = ({
  href,
  children
}: {
  href: string
  children: ReactNode
}) => {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'px-4 py-2 transition',
        isActive
          ? 'border-b-2 border-blue-600 font-bold text-blue-600'
          : 'text-pretty hover:text-blue-400'
      )}
    >
      {children}
    </Link>
  )
}
