import { UserCarsTableRow } from "../add-car/_types/types"

export type CarsGridProps = {
  userCarsCount: number | null
  initialData: UserCarsTableRow[] | null
  error: Error | null
}
