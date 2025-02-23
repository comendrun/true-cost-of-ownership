import { AIResponseTableRow } from '@/components/types/add-car/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function UserAnalysisOverview({
  userAnalysisList
}: {
  userAnalysisList: AIResponseTableRow[] | null
}) {
  return (
    <div className='flex h-full w-full flex-col justify-between gap-5'>
      <div className='m-auto flex h-full w-full max-w-[300px] flex-col justify-center'>
        {userAnalysisList ? (
          <>
            <p>You have saved</p>
            <p className='mx-auto text-[50px] font-bold md:text-[100px]'>
              {userAnalysisList.length}
            </p>
            <p className='ml-auto'>Cars in total.</p>
          </>
        ) : (
          <p className='mx-auto text-[25px]'>You have no Analysis yet.</p>
        )}
      </div>

      <div className='flex w-full gap-4'>   
        <Link href='/dashboard/add-car/'>
          <Button variant='secondary' className='ml-auto'>
            Add a new Car
          </Button>
        </Link>
        {/* {userAnalysisList && (
          <Button variant='default' className=''>
            Checkout 
          </Button>
        )} */}
      </div>
    </div>
  )
}
