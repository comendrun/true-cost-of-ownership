'use server'
import ErrorPage from '@/components/ui/page-components/error-page-component'
import { getUserCarWithId } from '@/server/actions/user-car-actions'

import VehicleDetailPage from '@/features/my-cars/components/vehicle-detail-page'

export default async function UserCarPage({
  params
}: {
  params: { carId: number }
}) {
  const { carId } = params

  const { data: userCar, error: userCarError } = await getUserCarWithId(carId)

  if (userCarError || !userCar) {
    console.log('the user cant see the page', userCarError, userCar)

    // return <div>Error loading data. Please try again later.</div>
    return (
      <ErrorPage
        title='Oops'
        description='You dont have access to this entity.'
        bounce={false}
        buttonTitle='Login'
        href='/auth/login'
      />
    )
  }

  const {
    brand,
    name,
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
    interior_score,
    initial_price,
    country,
    created_at,
    driver_age_range,
    driving_experience_years,
    eco_tax,
    estimated_resale_value,
    extended_warranty_cost,
    financing_duration,
    fuel_type,
    guarantee_years,
    id,
    insurance_type,
    interest_rate,
    last_ai_response_id,
    maintenance_frequency,
    offer_on_extended_warranty,
    oil_change_costs,
    parking_costs,
    prepayment,
    regular_maintenance_costs,
    remaining_amount,
    resale_value_after_years,
    service_costs,
    service_includes,
    taxes,
    tires_costs,
    total_interest_paid,
    total_planned_kms,
    true_purchase_price,
    tuv_costs,
    unexpected_repair_costs,
    updated_at,
    user_id,
    version
  } = userCar

  const annualTCO =
    tco && planned_years_of_ownership
      ? (tco / planned_years_of_ownership).toFixed(2)
      : 'N/A'

  return (
    <VehicleDetailPage car={userCar} />
    // <div className='min-h-max flex-1 rounded-xl bg-muted/50 p-5'>
    //   <div className='flex items-center justify-between'>
    //     <p className='my-4 flex items-end gap-2 font-bold'>
    //       <span className='text-lg'>{name ? name : `${brand}-${model}`}</span>
    //       Information
    //     </p>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger>
    //         <Tooltip>
    //           <TooltipTrigger>
    //             <CirclePlus />
    //           </TooltipTrigger>
    //           <TooltipContent>
    //             <p>Car Actions</p>
    //           </TooltipContent>
    //         </Tooltip>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent>
    //         <DropdownMenuLabel>Car Actions</DropdownMenuLabel>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem asChild>
    //           <Link
    //             href={`/dashboard/my-cars/${carId}/edit`}
    //             passHref
    //             className='flex items-center gap-3'
    //           >
    //             <span>
    //               <Pencil size={20} />
    //             </span>
    //             <span>Edit Car Details</span>
    //           </Link>
    //         </DropdownMenuItem>

    //         <DropdownMenuItem asChild>
    //           <GenerateAIAnalysisButton
    //             carId={carId}
    //             isDisabled={false}
    //             icon={<Sparkles size={20} />}
    //             variant='ghost'
    //             className=''
    //             // setState={setIsAnalysisGenerating}
    //           />
    //         </DropdownMenuItem>

    //         {userCar.last_ai_response_id && (
    //           <DropdownMenuItem asChild>
    //             <Link
    //               href={`/dashboard/my-cars/${carId}/analysis`}
    //               passHref
    //               className='flex items-center gap-3'
    //             >
    //               <span>
    //                 <FileText size={20} />
    //               </span>
    //               <span>Check Car Analysis</span>
    //             </Link>
    //           </DropdownMenuItem>
    //         )}
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>
    //   <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
    //     {/* General Information */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>General Information</CardTitle>
    //         <CardDescription>Basic details about your car</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <Table>
    //           <TableBody>
    //             <TableRow>
    //               <TableCell>Brand</TableCell>
    //               <TableCell>{brand}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Model</TableCell>
    //               <TableCell>{model}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Variant</TableCell>
    //               <TableCell>{variant || 'N/A'}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Year</TableCell>
    //               <TableCell>{year}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Mileage</TableCell>
    //               <TableCell>{mileage} km</TableCell>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </CardContent>
    //     </Card>

    //     {/* Costs */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Costs</CardTitle>
    //         <CardDescription>Overview of financial aspects</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <Table>
    //           <TableBody>
    //             <TableRow>
    //               <TableCell>Purchase Price</TableCell>
    //               <TableCell>€{purchase_price?.toFixed(2)}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Insurance Cost</TableCell>
    //               <TableCell>€{insurance_cost?.toFixed(2) || 'N/A'}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Average Fuel Cost</TableCell>
    //               <TableCell>
    //                 €{average_fuel_cost?.toFixed(2) || 'N/A'} per liter
    //               </TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Estimated Initial Price</TableCell>
    //               <TableCell>€{initial_price?.toFixed(2) || 'N/A'}</TableCell>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </CardContent>
    //     </Card>

    //     {/* Scores */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Scores & Performance</CardTitle>
    //         <CardDescription>
    //           Details on performance and ratings
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <Table>
    //           <TableBody>
    //             <TableRow>
    //               <TableCell>Fuel Consumption</TableCell>
    //               <TableCell>{fuel_consumption} L/100km</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Emissions</TableCell>
    //               <TableCell>{emissions || 'N/A'} g/km</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Depreciation Rate</TableCell>
    //               <TableCell>{depreciation_rate}% per year</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Exterior Score</TableCell>
    //               <TableCell>{exterior_score || 'N/A'} / 10</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Interior Score</TableCell>
    //               <TableCell>{interior_score || 'N/A'} / 10</TableCell>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </CardContent>
    //     </Card>

    //     {/* Total Cost of Ownership */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Total Cost of Ownership</CardTitle>
    //         <CardDescription>
    //           Comprehensive overview of the Car&apos;s ownership costs
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <Table>
    //           <TableBody>
    //             <TableRow>
    //               <TableCell>Total TCO</TableCell>
    //               <TableCell>€{tco?.toFixed(2) || 'N/A'}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Planned Ownership Years</TableCell>
    //               <TableCell>
    //                 {userCar.planned_years_of_ownership} Years
    //               </TableCell>
    //             </TableRow>
    //             <TableRow>
    //               <TableCell>Annualized TCO</TableCell>
    //               <TableCell>€{annualTCO} per year</TableCell>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
  )
}
