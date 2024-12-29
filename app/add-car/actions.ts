'use server'

import { createClient } from '@/utils/supabase/server'
import {
  CarFormValues,
  UserCarsTableInsert,
  UserCarsTableRow
} from './_types/types'

const convertAdvancedFormValuesToUserCarsTableInsert = (
  formValues: CarFormValues,
  userId: string
) => {
  const data: UserCarsTableInsert = {
    average_fuel_cost: formValues.averageFuelCost,
    brand: formValues.brand,
    created_at: new Date().toISOString(),
    depreciation_rate: formValues.depreciationRate,
    driver_age_range: formValues.driverAgeRange,
    driving_experience_years: formValues.drivingExperienceYears,
    eco_tax: formValues.ecoTax,
    emissions: formValues.emissions,
    estimated_resale_value: formValues.estimatedResaleValue,
    extended_warranty_cost: formValues.extendedWarrantyCost,
    exterior_score: formValues.exteriorScore,
    financing_duration: formValues.financingDuration,
    fuel_consumption: formValues.fuelConsumption,
    fuel_type: formValues.fuelType,
    guarantee_years: formValues.guaranteeYears,
    initial_price: formValues.initialPrice,
    insurance_cost: formValues.insuranceCost,
    insurance_type: formValues.insuranceType,
    interest_rate: formValues.interestRate,
    interior_score: formValues.interiorScore,
    last_ai_response_id: null, // Assuming this is not provided in formValues
    maintenance_frequency: formValues.maintenanceFrequency,
    mileage: formValues.mileage,
    model: formValues.model,
    name: formValues.name || '',
    offer_on_extended_warranty: formValues.offerOnExtendedWarranty,
    oil_change_costs: formValues.oilChangeCosts,
    parking_costs: formValues.parkingCosts,
    planned_years_of_ownership: formValues.plannedYearsOfOwnership,
    prepayment: formValues.prepayment,
    purchase_price: formValues.purchasePrice,
    regular_maintenance_costs: formValues.regularMaintenanceCosts,
    remaining_amount: formValues.remainingAmount,
    resale_value_after_years: formValues.resaleValueAfterYears,
    service_costs: formValues.serviceCosts,
    service_includes: formValues.serviceIncludes,
    taxes: formValues.taxes,
    tco: formValues.tco,
    tires_costs: formValues.tiresCosts,
    total_interest_paid: formValues.totalInterestPaid,
    total_planned_kms: formValues.totalPlannedKMs,
    true_purchase_price: formValues.truePurchasePrice,
    tuv_costs: formValues.tuvCosts,
    unexpected_repair_costs: formValues.unexpectedRepairCosts,
    updated_at: new Date().toISOString(),
    user_id: userId, // Assuming this is provided elsewhere
    variant: formValues.variant,
    year: formValues.year
  }

  return data
}

export const saveCar = async (
  id: string | number | null,
  formValues: CarFormValues
) => {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No user identified when trying to save the car instance.')
    return null
  }

  if (id) {
    const { data, error } = await supabase
      .from('user_cars')
      .select()
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    const updatedValues = Object.keys(data).reduce((acc, key) => {
      const typedKey = key as keyof UserCarsTableRow
      const dbFieldValue = data[typedKey]
      const formFieldValue = formValues[typedKey as keyof CarFormValues]

      if (formFieldValue !== undefined && formFieldValue !== dbFieldValue) {
        acc[typedKey] = formFieldValue as any // Use 'any' to bypass type mismatch
      }

      return acc
    }, {} as Partial<UserCarsTableRow>)

    const { data: dbUpdatedValues, error: updateError } = await supabase
      .from('user_cars')
      .update(updatedValues)
      .eq('id', id)
      .select()

    if (updateError) {
      console.error('There was an error while updating the values', updateError)
      return null
    }

    return dbUpdatedValues
  }

  const payload = convertAdvancedFormValuesToUserCarsTableInsert(
    formValues,
    user.id
  )

  const { data, error } = await supabase
    .from('user_cars')
    .insert(payload)
    .select()

  if (error || !data) {
    console.error(
      'There was an error while trying to insert a new user car in the db.',
      error
    )
    return null
  }

  return data
}
