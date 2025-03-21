import { UserCarsTableRow } from './db.types'

export type CarsDataTableProps = {
  userCarsCount: number | null
  initialData: UserCarsTableRow[] | null
  error: Error | null
}
