'use client'
import { UserProfile } from '@/components/types/add-car/types'
import { ThemeProvider } from '@/components/ui/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { useUserStore } from '@/lib/users.store'
import { ReactNode } from 'react'

export default function RootLayoutClientProviders({
  children
}: {
  children: ReactNode
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
