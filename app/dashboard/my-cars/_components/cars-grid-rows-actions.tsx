import { Row } from '@tanstack/react-table'
import React from 'react'
import { CarFormValues } from '../../add-car/_types/types'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { UserCarsTableRow } from '../../add-car/_types/types'

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
        <DropdownMenuItem>View Car Details</DropdownMenuItem>
        <DropdownMenuItem>Edit Car Details</DropdownMenuItem>
        <DropdownMenuItem>Generate new analysis</DropdownMenuItem>
        <DropdownMenuItem>View Generated Analysis</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
