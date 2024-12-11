import { createClient } from '@/utils/supabase/server'
import React, { ReactNode } from 'react'

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return <>{children}</>
}
