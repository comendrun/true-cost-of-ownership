'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { UserCarsTableRow } from '@/types/db.types'
import Link from 'next/link'

export default function UserCarsOverview({
  userCars,
  isLoading
}: {
  userCars: UserCarsTableRow[] | null
  isLoading: boolean
}) {
  // const { cars, isLoading } = useGetUserCars()

  if (isLoading) {
    return <UserCarsOverviewSkeleton />
  }

  return (
    <div className='rounded-xl bg-muted/50 p-5'>
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
    </div>
  )
}

export function UserCarsOverviewSkeleton() {
  return (
    <div className='rounded-xl bg-muted/50 p-5'>
      <div className='flex h-full w-full flex-col justify-between gap-5'>
        <div className='flex h-max w-full flex-row items-center justify-start gap-2'>
          <Skeleton className='h-8 w-full' />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className='h-6 w-16' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-16' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-16' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-16' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell>
                  <Skeleton className='h-6 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='flex w-full gap-4'>
          <Skeleton className='ml-auto h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>
    </div>
  )
}
