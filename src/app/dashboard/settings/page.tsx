import UserSettings from '@/components/pages/dashboard/settings/user-settings'

export default function SettingsPage() {
  // return <ComingSoon />

  return (
    <div className='min-h-max flex-1 rounded-xl bg-muted/50 p-10'>
      <div className='flex max-w-[600px] flex-col gap-3'>
        <UserSettings />
      </div>
    </div>
  )
}
