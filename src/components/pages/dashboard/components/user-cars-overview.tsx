'use client'
import { UserCarsTableRow } from '@/components/types/add-car/types'
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

export default function UserCarsOverview({
  userCars
}: {
  userCars: UserCarsTableRow[] | null
}) {
  return (
    <div className='flex h-full w-full flex-col justify-between gap-5'>
      <div className='flex h-max w-full flex-row items-center justify-start gap-2'>
        {userCars ? (
          <>
            <p>You have saved</p>
            <p className='text-[50px] font-bold md:text-xl'>
              {userCars.length}
            </p>
            <p className=''>Cars in total.</p>
          </>
        ) : (
          <p>You added no cars yet.</p>
        )}
      </div>

      {userCars && (
        // <Card>
        //   <CardHeader>
        //     <CardTitle>Your Saved Cars</CardTitle>
        //   </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>TCO</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userCars.slice(0, 5).map((car, index) => (
              <TableRow key={`car-${car.id}-${index}`}>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.tco}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/my-cars/${car.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        // </Card>
      )}

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
