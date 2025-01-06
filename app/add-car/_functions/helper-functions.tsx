import { FieldErrors } from 'react-hook-form'
import {
  CarFormValues,
  CheckboxField,
  FormFieldType,
  FormStepsIDs,
  InputField,
  SelectField,
  TextareaField,
  UserCarsTableInsert,
  UserCarsTableRow
} from '../_types/types'
import { advancedFormSteps } from '../_consts/consts'

export function calculateMonthlyPayment(
  remainingAmount: number,
  annualInterestRate: number,
  numYears: number
) {
  const monthlyRate = annualInterestRate / 100 / 12
  const totalPayments = numYears * 12
  return (
    (remainingAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments))
  )
}

export const calculateEstimatedResaleValue = ({
  purchasePrice,
  depreciationRate = 15,
  plannedYearsOfOwnership
}: CarFormValues) =>
  purchasePrice * Math.pow(1 - depreciationRate / 100, plannedYearsOfOwnership)

export const calculateTotalFuelCost = ({
  totalPlannedKMs,
  fuelConsumption = 1,
  averageFuelCost = 1,
  plannedYearsOfOwnership
}: CarFormValues) =>
  (totalPlannedKMs / 100) *
  fuelConsumption *
  averageFuelCost *
  plannedYearsOfOwnership

export const calculateTotalMaintenanceCost = ({
  serviceCosts = 0,
  oilChangeCosts = 0,
  tiresCosts = 0,
  tuvCosts = 1,
  plannedYearsOfOwnership
}: CarFormValues) =>
  (serviceCosts + oilChangeCosts + tiresCosts + tuvCosts) *
  plannedYearsOfOwnership

export const extractErrorFieldsLabels = (
  errors: FieldErrors<CarFormValues>
) => {
  if (Object.keys(errors).length > 0) {
    const errorKeys = Object.keys(errors)

    const allFormFields = advancedFormSteps
      .map(formStep => formStep.fields)
      .flat()
      .map(({ key, label }) => ({ key, label }))

    const keyLabels: { key: string; label: string }[] = []

    errorKeys.map(errorKey => {
      const errorField = allFormFields.filter(formField => {
        return formField.key === errorKey
      })[0]
      if (errorField) keyLabels.push(errorField)
    })

    return keyLabels
  }
  return null
}

export const getStepFormFields = (stepId: FormStepsIDs) =>
  advancedFormSteps.filter(s => s.id === stepId)[0]

export const getStepFieldKeys = (stepId: FormStepsIDs) => {
  const step = getStepFormFields(stepId)
  return step.fields.map(stepField => stepField.key)
}

export const getAllFormFieldKeys = () => {
  const formFieldKeys = advancedFormSteps
    .map(step => step.fields.map(formField => formField.key))
    .flat()
  return formFieldKeys
}

export const getKeysOutsideStep = (stepId: FormStepsIDs) => {
  const allFormFieldKeys = getAllFormFieldKeys()

  const stepKeys = getStepFieldKeys(stepId)
  const otherKeys = allFormFieldKeys.filter(key => !stepKeys.includes(key))
  return otherKeys
}

export const isInputField = (field: FormFieldType): field is InputField =>
  field.component === 'input'

export const isSelectField = (field: FormFieldType): field is SelectField =>
  field.component === 'select'

export const isTextareaField = (field: FormFieldType): field is TextareaField =>
  field.component === 'textarea'

export const isChekboxField = (field: FormFieldType): field is CheckboxField =>
  field.component === 'checkbox'

export function convertAdvancedFormValuesToUserCarsTableInsert(
  formValues: CarFormValues,
  userId: string
) {
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
export function convertUserCarsTableInsertToAdvancedFormValues(
  userCar: UserCarsTableRow
): CarFormValues {
  const formValues: CarFormValues = {
    averageFuelCost: userCar.average_fuel_cost ?? undefined,
    brand: userCar.brand,
    depreciationRate: userCar.depreciation_rate ?? undefined,
    driverAgeRange: userCar.driver_age_range as CarFormValues['driverAgeRange'],
    drivingExperienceYears: userCar.driving_experience_years,
    ecoTax: userCar.eco_tax ?? undefined,
    emissions: userCar.emissions ?? undefined,
    estimatedResaleValue: userCar.estimated_resale_value ?? undefined,
    extendedWarrantyCost: userCar.extended_warranty_cost ?? undefined,
    exteriorScore: userCar.exterior_score ?? undefined,
    financingDuration: userCar.financing_duration ?? undefined,
    fuelConsumption: userCar.fuel_consumption ?? undefined,
    fuelType: userCar.fuel_type as CarFormValues['fuelType'],
    guaranteeYears: userCar.guarantee_years ?? undefined,
    initialPrice: userCar.initial_price ?? undefined,
    insuranceCost: userCar.insurance_cost ?? undefined,
    insuranceType: userCar.insurance_type as CarFormValues['insuranceType'],
    interestRate: userCar.interest_rate ?? undefined,
    interiorScore: userCar.interior_score ?? undefined,
    maintenanceFrequency: userCar.maintenance_frequency ?? undefined,
    mileage: userCar.mileage,
    model: userCar.model,
    name: userCar.name,
    offerOnExtendedWarranty: userCar.offer_on_extended_warranty ?? undefined,
    oilChangeCosts: userCar.oil_change_costs ?? undefined,
    parkingCosts: userCar.parking_costs ?? undefined,
    plannedYearsOfOwnership: userCar.planned_years_of_ownership,
    prepayment: userCar.prepayment,
    purchasePrice: userCar.purchase_price,
    regularMaintenanceCosts: userCar.regular_maintenance_costs ?? undefined,
    remainingAmount: userCar.remaining_amount ?? undefined,
    resaleValueAfterYears: userCar.resale_value_after_years ?? undefined,
    serviceCosts: userCar.service_costs ?? undefined,
    serviceIncludes: userCar.service_includes ?? undefined,
    taxes: userCar.taxes ?? undefined,
    tco: userCar.tco ?? undefined,
    tiresCosts: userCar.tires_costs ?? undefined,
    totalInterestPaid: userCar.total_interest_paid ?? undefined,
    totalPlannedKMs: userCar.total_planned_kms,
    truePurchasePrice: userCar.true_purchase_price ?? undefined,
    tuvCosts: userCar.tuv_costs ?? undefined,
    unexpectedRepairCosts: userCar.unexpected_repair_costs ?? undefined,
    variant: userCar.variant ?? undefined,
    year: userCar.year
  }

  return formValues
}
