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

export default function UserAnalysisOverview({
  isLoading,
  userCarsWithAnalysis
}: {
  isLoading: boolean
  userCarsWithAnalysis?: UserCarsTableRow[]
}) {
  if (isLoading) {
    return <UserAnalysisOverviewSkeleton />
  }

  return (
    <div className='rounded-xl bg-muted/50 p-5'>
      <div className='flex h-full w-full flex-col justify-between gap-5'>
        <div className='flex h-max w-full flex-row items-center justify-start gap-2'>
          {userCarsWithAnalysis ? (
            <>
              <p>You have</p>
              <p className='text-[50px] font-bold md:text-xl'>
                {userCarsWithAnalysis.length}
              </p>
              <p className=''>Car Analysis in total.</p>
            </>
          ) : (
            <p className='mx-auto text-[25px]'>You have no Analysis yet.</p>
          )}
        </div>

        {userCarsWithAnalysis && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userCarsWithAnalysis.slice(0, 5).map((userCar, index) => {
                // const userCar = userCars?.filter(
                //   car => car.id === analysis.car_id
                // )[0]
                return (
                  <TableRow key={`user-car-analysis-${userCar.id}-${index}`}>
                    <TableCell>{userCar?.name}</TableCell>
                    <TableCell>{userCar.version}</TableCell>
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
    </div>
  )
}

export function UserAnalysisOverviewSkeleton() {
  return (
    <div className='rounded-xl bg-muted/50 p-5'>
      <div className='flex h-full w-full flex-col justify-between gap-5'>
        <div className='flex h-max w-full flex-row items-center justify-start gap-2'>
          <Skeleton className='h-10 w-full' />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className='h-6 w-full' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-full' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-full' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`skeleton-row-${index}`}>
                <TableCell>
                  <Skeleton className='h-6 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-full' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='flex w-full gap-4'>
          <Skeleton className='h-10 w-1/4' />
          <Skeleton className='h-10 w-1/4' />
        </div>
      </div>
    </div>
  )
}
