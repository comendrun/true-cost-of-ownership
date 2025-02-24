import {
  AIResponseTableRow,
  UserCarsTableRow
} from '@/components/types/add-car/types'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'
import React from 'react'

export default function UserAnalysisOverview({
  userAnalysisList,
  userCars
}: {
  userAnalysisList: AIResponseTableRow[] | null
  userCars: UserCarsTableRow[] | null
}) {
  return (
    <div className='flex h-full w-full flex-col justify-between gap-5'>
      <div className='flex h-max w-full flex-row items-center justify-start gap-2'>
        {userAnalysisList ? (
          <>
            <p>You have</p>
            <p className='text-[50px] font-bold md:text-xl'>
              {userAnalysisList.length}
            </p>
            <p className=''>Car Analysis in total.</p>
          </>
        ) : (
          <p className='mx-auto text-[25px]'>You have no Analysis yet.</p>
        )}
      </div>

      {userAnalysisList && (
        // <Card>
        //   <CardHeader>
        //     <CardTitle>Your Saved Cars</CardTitle>
        //   </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAnalysisList.slice(0, 5).map((analysis, index) => {
              const userCar = userCars?.filter(
                car => car.id === analysis.car_id
              )[0]
              return (
                <TableRow>
                  <TableCell>{userCar?.name}</TableCell>
                  <TableCell>{analysis.version}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/my-cars/${userCar?.id}/analysis`}>
                      Full Analysis
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        // </Card>
      )}

      <div className='flex w-full gap-4'>
        {/* <Link href='/dashboard/add-car/'>
          <Button variant='secondary' className='ml-auto'>
            Add a new Car
          </Button>
        </Link> */}
        {/* {userAnalysisList && (
          <Button variant='default' className=''>
            Checkout 
          </Button>
        )} */}
      </div>
    </div>
  )
}
