'use server'
import DashboardView from '@/features/dashboard/components/dashboard-view'

export default async function Page() {
  return (
    <>
      <div className='grid auto-rows-min gap-4 xl:grid-cols-2'>
        <DashboardView />
      </div>
    </>
  )
}
