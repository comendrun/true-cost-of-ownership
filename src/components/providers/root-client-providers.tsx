'use client'
import { ThemeProvider } from '@/components/ui/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/react'

export default function RootLayoutClientProviders({
                                                    children
                                                  }: {
  children: ReactNode
}) {
  return (
    <>
      <HeroUIProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </HeroUIProvider>
    </>
  )
}
