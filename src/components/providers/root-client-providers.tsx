'use client'
import { ThemeProvider } from '@/components/ui/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function RootLayoutClientProviders({
  children
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  return (
    <>
      <HeroUIProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          // disableTransitionOnChange
        >
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className=''
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ThemeProvider>
        <Toaster />
      </HeroUIProvider>
    </>
  )
}
