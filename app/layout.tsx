import Navbar from '@/components/navbar/Navbar'
import { ThemeProvider } from '@/components/ui/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { createClient } from '@/utils/supabase/server'
import Providers from './providers'
import { redirect } from 'next/navigation'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

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
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto min-h-screen w-full antialiased`}
      >
        <Providers>
          {/* <div className='m-10 mx-auto min-h-screen w-full max-w-[1000px] p-5'> */}
          {/* <Navbar user={user} /> */}
          {children}
          {/* </div> */}
        </Providers>
      </body>
    </html>
  )
}
