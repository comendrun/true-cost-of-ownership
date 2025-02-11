'use server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import ErrorPage from '@/components/ui/page-components/error-page-component'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getUserCarWithId } from '@/server-actions/user-car-actions'
import Link from 'next/link'

export default async function UserCarPage({
  params
}: {
  params: { carId: number }
}) {
  const { carId } = params

  const { data: userCar, error: userCarErrerroror } =
    await getUserCarWithId(carId)

  if (userCarErrerroror || !userCar) {
    console.log('the user cant see the page')

    // return <div>Error loading data. Please try again later.</div>
    return (
      <ErrorPage
        title='Oops'
        description='You dont have access to this entity.'
        bounce={false}
        buttonTitle='Login'
        href='/login'
      />
    )
  }

  console.log('userCar', userCar)

  const {
    brand,
    model,
    variant,
    year,
    mileage,
    purchase_price,
    tco,
    planned_years_of_ownership,
    insurance_cost,
    fuel_consumption,
    average_fuel_cost,
    emissions,
    depreciation_rate,
    exterior_score,
    interior_score
  } = userCar

  const annualTCO =
    tco && planned_years_of_ownership
      ? (tco / planned_years_of_ownership).toFixed(2)
      : 'N/A'

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Basic details about your car</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Model</TableCell>
                  <TableCell>{model}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variant</TableCell>
                  <TableCell>{variant || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>{year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mileage</TableCell>
                  <TableCell>{mileage} km</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Costs */}
        <Card>
          <CardHeader>
            <CardTitle>Costs</CardTitle>
            <CardDescription>Overview of financial aspects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>€{purchase_price?.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Insurance Cost</TableCell>
                  <TableCell>€{insurance_cost?.toFixed(2) || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Fuel Cost</TableCell>
                  <TableCell>
                    €{average_fuel_cost?.toFixed(2) || 'N/A'} per liter
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Scores & Performance</CardTitle>
            <CardDescription>
              Details on performance and ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Fuel Consumption</TableCell>
                  <TableCell>{fuel_consumption} L/100km</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Emissions</TableCell>
                  <TableCell>{emissions || 'N/A'} g/km</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Depreciation Rate</TableCell>
                  <TableCell>{depreciation_rate}% per year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Exterior Score</TableCell>
                  <TableCell>{exterior_score || 'N/A'} / 10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Interior Score</TableCell>
                  <TableCell>{interior_score || 'N/A'} / 10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Total Cost of Ownership */}
        <Card>
          <CardHeader>
            <CardTitle>Total Cost of Ownership</CardTitle>
            <CardDescription>
              Comprehensive overview of the Car&apos;s ownership costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Total TCO</TableCell>
                  <TableCell>€{tco?.toFixed(2) || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Planned Ownership Years</TableCell>
                  <TableCell>
                    {userCar.planned_years_of_ownership} Years
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Annualized TCO</TableCell>
                  <TableCell>€{annualTCO} per year</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Button */}
      <div className='mt-6 flex flex-row gap-4'>
        <Link href={`/dashboard/my-cars/${carId}/edit`} passHref>
          <Button className='w-full md:w-auto'>Edit Car Details</Button>
        </Link>

        <Button>Generate Analysis</Button>

        {userCar.last_ai_response_id && (
          <Link href={`/dashboard/my-cars/${carId}/analysis`} passHref>
            <Button>Check the generated Analysis</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
