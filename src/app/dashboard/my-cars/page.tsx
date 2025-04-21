'use server'
import CarsGrid from '@/features/my-cars/components/cars-grid'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function MyCarsPage() {
  const supabase = createClient()

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  return <CarsGrid />
}
