'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function SimpleFormPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/add-car/simple/car')
  }, [router])

  return (
    <div className='flex h-full max-w-full flex-1 items-center justify-center rounded-xl p-5'>
      <Loader2 className='h-8 w-8 animate-spin' />
    </div>
  )
}
