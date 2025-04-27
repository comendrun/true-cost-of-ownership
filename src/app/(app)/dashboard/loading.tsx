import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function DashboardLoading() {
  return (
    <div className='grid auto-rows-min gap-4 xl:grid-cols-2'>
      <Skeleton className='aspect-video rounded-xl bg-muted/50 p-5' />
      <Skeleton className='aspect-video rounded-xl bg-muted/50 p-5' />
    </div>
  )
}
