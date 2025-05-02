'use client'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="p-10 w-full  flex justify-between items-center border-t">
      <div className="logo py-4 hover:cursor-pointer">
        <Link href="/">
          <p className="font-bold text-md tracking-widest">AutoMon</p>
        </Link>
      </div>

      <a href="https://comendrun.com" target="_blank" className="font-bold text-md tracking-widest">
        <p className="text-sm">@{year} COMENDRUN</p>
      </a>
    </footer>
  )
}