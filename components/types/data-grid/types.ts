import { UserCarsTableRow } from '../add-car/types'

export type CarsDataTableProps = {
  userCarsCount: number | null
  initialData: UserCarsTableRow[] | null
  error: Error | null
}
