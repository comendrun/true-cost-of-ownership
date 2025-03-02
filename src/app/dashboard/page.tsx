'use server'

import DashboardView from '@/components/pages/dashboard/components/dashboard-view'

export default async function Page() {
  return (
    <>
      <div className='grid auto-rows-min gap-4 xl:grid-cols-2'>
        <DashboardView />
      </div>
      {/* <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' /> */}
    </>
  )
}
