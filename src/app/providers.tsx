'use client'
import { UserProfile } from '@/components/types/add-car/types'
import { ThemeProvider } from '@/components/ui/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ReactNode } from 'react'

export default function ClientProviders({
  children,
  user
}: {
  children: ReactNode
  user: UserProfile | null
}) {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        // disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster />
    </>
  )
}
