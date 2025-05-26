'use client'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='flex w-full items-center justify-between border-t p-10'>
      <div className='logo flex items-center gap-2 py-4 hover:cursor-pointer'>
        <Link href='/'>
          <p className='text-md font-bold tracking-widest'>AutoMon</p>
        </Link>
        <p className='text-xs'>V{process.env.NEXT_PUBLIC_APP_VERSION}</p>
      </div>

      <a
        href='https://comendrun.com'
        target='_blank'
        className='text-md font-bold tracking-widest'
      >
        <p className='text-sm'>@{year} COMENDRUN</p>
      </a>
    </footer>
  )
}
