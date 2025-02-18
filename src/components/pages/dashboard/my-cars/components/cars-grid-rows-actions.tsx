import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { UserCarsTableRow } from '../../../../types/add-car/types'

export default function CarsGridRowActions({
  row
}: {
  row: Row<UserCarsTableRow>
}) {
  const car = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(`${car.id}`)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/my-cars/${car.id}`}>View Car Details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/my-cars/${car.id}/edit`}>
            Edit Car Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Generate new analysis</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/my-cars/${car.id}/analysis`}>
            View Generated Analysis
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
