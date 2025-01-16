import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function MyCarsPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  console.log('metadata', data.user.user_metadata)
  

  return <div>
    <p>Hello </p>
  </div>
}