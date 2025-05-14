'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getCarImageByBrandAndModel } from '@/data/cars-data'
import { UserCarsTableRow } from '@/types/db.types'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { ChartColumn, CirclePlus, FileText, Pencil, Sparkles } from 'lucide-react'
import Link from 'next/link'
import GenerateAIAnalysisButton from '@/components/others/generate-ai-analysis-button'
import { Button } from '@/components/ui/button'

export default function VehicleDetailPage({ car }: { car: UserCarsTableRow }) {
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
  } = car


  const resaleValueAfterYears = resale_value_after_years ??
    Math.floor(purchase_price * Math.pow((1 - (depreciation_rate ?? 5) / 100), planned_years_of_ownership)) // TODO: Define a more moderate and understanding resale value estimation function


  const annualTCO =
    tco && planned_years_of_ownership
      ? (tco / planned_years_of_ownership).toFixed(2)
      : 'N/A'


  const carId = car.id

  return (
    <div className="grid max-h-max w-full gap-4 lg:grid-cols-2 2xl:grid-cols-3 lg:px-10">
      {/* Car Details */}
      <CarGridCell
        className="max-h-max lg:col-span-2 2xl:col-span-3 order-1"
        cardHeader={`Car Details: ${brand} ${model} ${year}`}
        contentClassName="flex flex-col lg:flex-row justify-between"
      >
        <div className="flex flex-col md:flex-row gap-2"><p>Year: {year} | </p>
          <p> Variant: {variant ?? '-'} | </p>
          <p>Country: {country}</p></div>
        <CarActionsDropDown car={car} />

      </CarGridCell>

      <FinancialSummary car={car} />

      <KeyMetrics car={car} />

      <CarImage car={car} />
    </div>
  )
}

const CarGridCell = ({
                       children,
                       className = '',
                       cardHeader,
                       contentClassName
                     }: {
  children?: ReactNode
  className?: string
  cardHeader?: string | ReactNode
  contentClassName?: string
}) => {
  return (
    <div className={'car-grid-cell w-full rounded-md ' + className}>
      <Card className="h-full w-full p-3 2xl:p-5 flex flex-col">
        {cardHeader && (
          <CardHeader className="text-xl font-semibold">
            {cardHeader}
          </CardHeader>
        )}
        <CardContent className={`flex gap-2 ${contentClassName}`}>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}


const FinancialSummary = ({ car }: { car: UserCarsTableRow }) => {
  const { purchase_price, interest_rate, prepayment, planned_years_of_ownership } = car
  return (<CarGridCell
    className="h-full 2xl:col-span-1 order-3 lg:order-2 2xl:order-2"
    cardHeader={`Financial Summary`}
    contentClassName="grid xl:grid-cols-2 gap-2 h-full"
  >
    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Purchase Price</p>
        <p className="text-xs font-semibold">€{purchase_price}</p>
      </CardContent>
    </Card>
    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Prepayment</p>
        <p className="text-xs font-semibold">€{prepayment}</p>
      </CardContent>
    </Card>
    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Interest Rate</p>
        <p className="text-xs font-semibold">%{interest_rate}</p>
      </CardContent>
    </Card>
    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Estimated resale value (after {planned_years_of_ownership} years)</p>
        <p className="text-xs font-semibold">TO BE Implemented</p>
      </CardContent>
    </Card>
  </CarGridCell>)
}

const KeyMetrics = ({ car }: { car: UserCarsTableRow }) => {
  const {
    purchase_price,
    interest_rate,
    prepayment,
    planned_years_of_ownership,
    tco,
    mileage,
    total_planned_kms,
    fuel_consumption,
    depreciation_rate
  } = car
  return (<CarGridCell
    className="h-full 2xl:col-span-1 order-3 lg:order-4 2xl:order-3"
    cardHeader={`Key Metrics`}
    contentClassName="grid xl:grid-cols-2 gap-2 h-full"
  >
    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Total Cost of Ownership</p>
        <p className="text-xs font-semibold">€{tco}</p>
      </CardContent>
    </Card>

    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Current Mileage (km)</p>
        <p className="text-xs font-semibold">{mileage}</p>
      </CardContent>
    </Card>


    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Planned KMs (Annual)</p>
        <p className="text-xs font-semibold">{total_planned_kms}</p>
      </CardContent>
    </Card>


    <Card className="pt-5">
      <CardContent className="max-w-max flex flex-col gap-2">
        <p className="text-xs">Depreciation Rate (Annual)</p>
        <p className="text-xs font-semibold">%{depreciation_rate}</p>
      </CardContent>
    </Card>
  </CarGridCell>)
}


const CarImage = ({ car }: { car: UserCarsTableRow }) => {
  const { brand, model } = car
  const carImagePath = `/assets/cars/${getCarImageByBrandAndModel(brand, model)}`
  return (
    <CarGridCell className="2xl:col-span-1 order-2 lg:order-3 2xl:order-4"
                 contentClassName="justify-center items-center m-auto">
      <Image
        src={carImagePath}
        width={500}
        height={500}
        alt={`${brand}-${model}`}
        className="m-auto"
      />
    </CarGridCell>
  )
}


const CarActionsDropDown = ({ car }: { car: UserCarsTableRow }) => {
  const carId = car.id
  return (
    <div className="flex gap-2 mt-5 md:mt-0">
      {car.last_ai_response_id && (<div>
        <Tooltip>
          <TooltipTrigger className="">
            <Button asChild variant="secondary">
              <Link
                href={`/dashboard/my-cars/${carId}/analysis`}
                passHref
                className="flex items-center gap-3"
              >
                <ChartColumn />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>There is a generated Car Analysis. Check it out!</p>
          </TooltipContent>
        </Tooltip>
      </div>)}


      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <Button className="w-full ">
            Car Actions
          </Button>
          {/*<Tooltip>*/}
          {/*  <TooltipTrigger className=''>*/}
          {/*  </TooltipTrigger>*/}
          {/*  <TooltipContent>*/}
          {/*    <p>Car Actions</p>*/}
          {/*  </TooltipContent>*/}
          {/*</Tooltip>*/}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col w-full">
          <DropdownMenuLabel className="w-full">Car Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/my-cars/${carId}/edit`}
              passHref
              className="flex items-center gap-3"
            >
            <span>
              <Pencil size={20} />
            </span>
              <span>Edit Car Details</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <GenerateAIAnalysisButton
              carId={carId}
              isDisabled={false}
              icon={<Sparkles size={20} />}
              variant="ghost"
              className=""
              // setState={setIsAnalysisGenerating}
            />
          </DropdownMenuItem>

          {car.last_ai_response_id && (
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/my-cars/${carId}/analysis`}
                passHref
                className="flex items-center gap-3"
              >
              <span>
                <FileText size={20} />
              </span>
                <span>Check Car Analysis</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu></div>

  )
}
