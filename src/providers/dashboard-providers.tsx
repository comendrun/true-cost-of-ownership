'use client'
import { UserProfile } from '@/components/types/add-car/types'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useUserStore } from '@/lib/users.store'
import { ReactNode } from 'react'

export default function DashboardProviders({
  children,
  user
}: {
  children: ReactNode
  user: UserProfile | null
}) {
  const setUser = useUserStore(state => state.setUser)
  const storedUser = useUserStore(state => state.user)
  const clearStorage = useUserStore(state => state.clearStorage)

  if (!user) {
    clearStorage()
  } else {
    if (!storedUser) {
      setUser(user)
    }
  }

  return (
    <>
      <SidebarProvider>{children}</SidebarProvider>
    </>
  )
}
