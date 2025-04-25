'use client'
import React from 'react'

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table/data-table'
import { columns } from './cars-grid-columns'
import { CarsDataTableProps } from '@/types/data-grid.types'
import useGetUserCars from '@/hooks/use-get-user-cars'

export default function CarsGrid() {
  const { cars, error, isLoading, triggerFetch } = useGetUserCars()

  return (
    <div className='min-h-max flex-1 rounded-xl bg-muted/50 p-10'>
      <DataTable columns={columns} data={cars || []} isLoading={isLoading} />
    </div>
  )
}
