/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import RootLayoutClientProviders from '@/components/providers/root-client-providers'
import { geistMono, geistSans } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'AutoMon - developed by comendrun',
  description:
    'A helper app to calculate true cost of ownership for your current or planned cars.'
}

export default async function RootLayout({
                                           children
                                         }: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">

    <body
      className={`${geistSans.variable} ${geistMono.variable} mx-auto min-h-screen w-[100vw] antialiased`}
    >
    <RootLayoutClientProviders>
      {children}
    </RootLayoutClientProviders>
    </body>
    </html>
  )
}
