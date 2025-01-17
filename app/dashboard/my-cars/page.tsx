import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function MyCarsPage() {
  const supabase = createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  console.log('metadata', user.user_metadata)

  // const numberOfUserCars = (
  //   await supabase.from('user_cars').select().eq('user_id', user.id)
  // ).count

  const { count: numberOfUserCars } = await supabase
    .from('user_cars')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const {
    data: paginatedCars,
    error: userCarErrors,
    // count: numberOfUserCars
  } = await supabase
    .from('user_cars')
    .select()
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  // console.log('number of user cars', numberOfUserCars)
  console.log('paginated cars', paginatedCars)

  return (
    <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'></div>
  )
}
