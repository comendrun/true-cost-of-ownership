'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsClient({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Determine the active tab based on the current URL
  const activeTab = pathname.includes('register') ? 'register' : 'login'

  return (
    <Tabs
      defaultValue={activeTab}
      className='w-[400px]'
      onValueChange={value => {
        // Navigate to the appropriate route when the tab changes
        if (value === 'login') router.push('/auth/login')
        if (value === 'register') router.push('/auth/register')
      }}
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger className='w-full' value='login'>
          Login
        </TabsTrigger>
        <TabsTrigger className='w-full' value='register'>
          Register
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
