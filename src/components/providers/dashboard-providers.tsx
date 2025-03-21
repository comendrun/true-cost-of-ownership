'use client'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useUserStore } from '@/hooks/users.store'
import { UserProfile } from '@/types/db.types'
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
