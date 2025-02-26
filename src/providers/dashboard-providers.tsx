'use client'
import { UserProfile } from '@/components/types/add-car/types'
import { SidebarProvider } from '@/components/ui/sidebar'
import { LOCAL_STORAGE_KEYS } from '@/consts/app-constants'
import { State, useUserStore } from '@/lib/users.store'
import React, { ReactNode } from 'react'

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

  console.log('storedUser', storedUser)
  

  if (!user) {
    clearStorage()
  } else {
    !storedUser && setUser(user)
  }

  return (
    <>
      <SidebarProvider>{children}</SidebarProvider>
    </>
  )
}
