import { UserCarsTableRow } from '../../../../../features/add-car/types/add-cars.types'

export type CarsDataTableProps = {
  userCarsCount: number | null
  initialData: UserCarsTableRow[] | null
  error: Error | null
}
