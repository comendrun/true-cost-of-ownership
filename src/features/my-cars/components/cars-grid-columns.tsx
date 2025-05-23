import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CarsGridRowActions from './cars-grid-rows-actions'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { UserCarsTableRow } from '@/types/db.types'
import Link from 'next/link'

export const columns: ColumnDef<UserCarsTableRow>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    // header: 'Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Brand
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('brand')}</div>
  },
  {
    accessorKey: 'tco',
    // header: () => <div className='text-right'>Total Cost of Ownership</div>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total Cost of Ownership' />
    ),
    cell: ({ row }) => {
      //   const amount = parseFloat(row.getValue('tco'))
      const amount = Number(row.getValue('tco'))

      // Format the amount as a Euro amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return <div className='text-left font-medium'>{formatted}</div>
    }
  },

  {
    id: 'link',
    header: ({ column }) => <p>Car Page</p>,
    cell: ({ row }) => {
      const id = row.original?.['id']
      return (
        <Link
          href={`/dashboard/my-cars/${id}`}
          className=''
          target='_blank'
          title='Check out the Car details page'
        >
          <ExternalLink size={20} />
        </Link>
      )
    }
  },

  {
    id: 'link',
    header: ({ column }) => <p>Analysis</p>,
    cell: ({ row }) => {
      const analysisId = row.original?.['last_ai_response_id']
      const id = row.original?.['id']

      if (!analysisId) return null

      return (
        <Link
          href={`/dashboard/my-cars/${id}/analysis`}
          className=''
          target='_blank'
          title='Check out the Generated Analysis'
        >
          <ExternalLink size={20} />
        </Link>
      )
    }
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CarsGridRowActions row={row} />
  }
]
