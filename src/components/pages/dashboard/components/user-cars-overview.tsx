'use client'
import { UserCarsTableRow } from '@/components/types/add-car/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UserCarsOverview({
  userCars
}: {
  userCars: UserCarsTableRow[] | null
}) {
  return (
    <div className='flex h-full w-full flex-col justify-between gap-5'>
      <div className='m-auto flex h-full w-full max-w-[300px] flex-col justify-center'>
        {userCars ? (
          <>
            <p>You have saved</p>
            <p className='mx-auto text-[50px] font-bold md:text-[100px]'>
              {userCars.length}
            </p>
            <p className='ml-auto'>Cars in total.</p>
          </>
        ) : (
          <p>You added no cars yet.</p>
        )}
      </div>

      <div className='flex w-full gap-4'>
        <Button asChild variant='secondary' className='ml-auto'>
          <Link href='/dashboard/add-car/'>Add a new Car</Link>
        </Button>
        {userCars && (
          <Button asChild variant='default' className=''>
            <Link href='/dashboard/my-cars'>My Cars</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
