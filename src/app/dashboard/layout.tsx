import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar'
import Breadcrumbs from '@/components/ui/sidebar/breadcrumbs'
import DashboardProviders from '@/providers/dashboard-providers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser()

  if (getUserError || !user) {
    redirect('/auth/login')
  }

  const { data: userProfile, error: getProfileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)
    .single()

  const { data: userLatestCars, error } = await supabase
    .from('user_cars')
    .select()
    .eq('user_id', user?.id as string)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <DashboardProviders user={userProfile}>
        <AppSidebar user={userProfile} cars={userLatestCars} />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumbs />
            </div>
          </header>
          <div className='flex w-full flex-1 flex-col gap-4 p-2'>
            {children}
          </div>
        </SidebarInset>
      </DashboardProviders>
    </>
  )
}
