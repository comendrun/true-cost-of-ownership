import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ClientProviders from './providers'

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

  const { data: userProfile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single()

  if (error) {
    console.error(
      'There was an error while trying to get the User Profile.',
      error?.cause
    )
  }

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto min-h-screen w-full antialiased`}
      >
        <ClientProviders user={userProfile}>
          {/* <div className='m-10 mx-auto min-h-screen w-full max-w-[1000px] p-5'> */}
          {/* <Navbar user={user} /> */}
          {children}
          {/* </div> */}
        </ClientProviders>
      </body>
    </html>
  )
}
