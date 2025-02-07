import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar'
import Breadcrumbs from '@/components/ui/sidebar/breadcrumbs'
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

  // let breadCrumbUserCar = null
  // let breadCrumbUserCarError = null

  // if (params?.id !== undefined) {
  //   const { data, error } = await supabase
  //     .from('user_cars')
  //     .select('id, name')
  //     .eq('id', params.id)
  //     .single()
  //   breadCrumbUserCar = data
  //   breadCrumbUserCarError = error
  // }

  // if (breadCrumbUserCarError || error || getProfileError) {
  //   console.error('Error fetching data:', {
  //     breadCrumbUserCarError,
  //     error,
  //     getProfileError
  //   })
  // }

  // console.log('breadCrumbcar', breadCrumbUserCar)

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={userProfile} cars={userLatestCars} />

        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              {/* <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
              <Breadcrumbs />
            </div>
          </header>
          <div className='flex w-full flex-1 flex-col gap-4 p-2'>
            {/* <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
              <div className='aspect-video rounded-xl bg-muted/50' />
              <div className='aspect-video rounded-xl bg-muted/50' />
              <div className='aspect-video rounded-xl bg-muted/50' />
            </div> */}
            {children}
            {/* <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
            </div> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
