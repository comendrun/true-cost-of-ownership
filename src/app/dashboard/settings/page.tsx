import UserSettings from '@/components/pages/dashboard/settings/user-settings'
import ComingSoon from '@/components/ui/page-components/coming-soon'
import React from 'react'

export default function SettingsPage() {
  // return <ComingSoon />

  return (
    <div className='min-h-max flex-1 rounded-xl bg-muted/50 p-10'>
      <div className='flex flex-col gap-3 max-w-[500px]'>

      <UserSettings />
      </div>
    </div>
  )
}
