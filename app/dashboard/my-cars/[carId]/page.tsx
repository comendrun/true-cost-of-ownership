import React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '@/components/ui/table'

export default async function UserCarPage({
  params
}: {
  params: { carId: number }
}) {
  const { carId } = params
  const supabase = createClient()

  const { data: userCar, error: userCarError } = await supabase
    .from('user_cars')
    .select()
    .eq('id', carId)
    .single()

  if (userCarError || !userCar) {
    return <div>Error loading data. Please try again later.</div>
  }

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
      <div className='mt-6'>
        <Link href={`/dashboard/add-car/advanced?id=${carId}`} passHref>
          <Button className='w-full md:w-auto'>Edit Car Details</Button>
        </Link>
      </div>
    </div>
  )
}
