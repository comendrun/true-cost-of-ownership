import { getPaginatedUserCars } from '@/features/my-cars/server/actions/get-paginated-user-cars.action'
import React, { useCallback } from 'react'

export default function useGetPaginatedUserCars({
  pageNum,
  pageSize
}: {
  pageNum: number
  pageSize: number
}) {
  const result = useCallback(async () => {
    const {
      data: paginatedCars,
      error: getPaginatedUserCarsError,
      total
    } = await getPaginatedUserCars(pageNum, pageSize)
  }, [pageNum, pageSize])
}
