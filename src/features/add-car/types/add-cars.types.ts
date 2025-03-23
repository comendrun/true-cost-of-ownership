import { UserCarsTableRow } from '@/types/db.types'
import { FormFieldType } from '@/types/form-field.types'
import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import { z } from 'zod'
import {
  CarFormOptionalFieldsSchema,
  CarFormSchema,
  CarFormSchemaOptional
} from './add-car.schemas'

export type CarFormFields = z.infer<typeof CarFormSchema>

export type CarFormFieldsKeys = keyof CarFormFields

export type OptionalAllCarFormFields = z.infer<typeof CarFormSchemaOptional>

export type CarFormOptionalFields = z.infer<typeof CarFormOptionalFieldsSchema>

export type CarFormOptionalFieldsKeys = keyof CarFormOptionalFields

export type FormSteps<TFieldValues> = {
  id: FormStepsIDs
  index: number
  title: string
  fields: FormFieldType<TFieldValues>[]
}

export type FormStepsIDs =
  | 'essentialInfo'
  | 'financialOverview'
  | 'efficiencyConsumption'
  | 'maintenanceWarranty'
// | 'generalInfo'
// | 'finances'
// | 'depreciation'
// | 'warrantyAndService'
// | 'efficiency'
// | 'insurance'
// | 'otherCosts'
// | 'resaleValue'
// | 'maintenance'
// | 'personalPreferences'
// | 'environmentalImpact'
// | 'totalCostOfOwnership'

export type CarFormValuesKeys = keyof CarFormFields

export const userCarFormToTableKeyMapping: Record<
  keyof CarFormFields,
  keyof UserCarsTableRow
> = {
  name: 'name',
  brand: 'brand',
  model: 'model',
  variant: 'variant',
  year: 'year',
  mileage: 'mileage',
  plannedYearsOfOwnership: 'planned_years_of_ownership',
  drivingExperienceYears: 'driving_experience_years',
  driverAgeRange: 'driver_age_range',
  interiorScore: 'interior_score',
  exteriorScore: 'exterior_score',
  purchasePrice: 'purchase_price',
  prepayment: 'prepayment',
  interestRate: 'interest_rate',
  financingDuration: 'financing_duration',
  remainingAmount: 'remaining_amount',
  totalInterestPaid: 'total_interest_paid',
  truePurchasePrice: 'true_purchase_price',
  initialPrice: 'initial_price',
  depreciationRate: 'depreciation_rate',
  guaranteeYears: 'guarantee_years',
  serviceCosts: 'service_costs',
  serviceIncludes: 'service_includes',
  tiresCosts: 'tires_costs',
  oilChangeCosts: 'oil_change_costs',
  offerOnExtendedWarranty: 'offer_on_extended_warranty',
  extendedWarrantyCost: 'extended_warranty_cost',
  totalPlannedKMs: 'total_planned_kms',
  fuelConsumption: 'fuel_consumption',
  fuelType: 'fuel_type',
  averageFuelCost: 'average_fuel_cost',
  insuranceType: 'insurance_type',
  insuranceCost: 'insurance_cost',
  tuvCosts: 'tuv_costs',
  taxes: 'taxes',
  parkingCosts: 'parking_costs',
  estimatedResaleValue: 'estimated_resale_value',
  resaleValueAfterYears: 'resale_value_after_years',
  regularMaintenanceCosts: 'regular_maintenance_costs',
  unexpectedRepairCosts: 'unexpected_repair_costs',
  maintenanceFrequency: 'maintenance_frequency',
  emissions: 'emissions',
  ecoTax: 'eco_tax',
  tco: 'tco',
  country: 'country'
}

export const userCarTableToFormKeyMapping: Record<
  keyof UserCarsTableRow,
  keyof CarFormFields
> = Object.fromEntries(
  Object.entries(userCarFormToTableKeyMapping).map(([formKey, dbKey]) => [
    dbKey,
    formKey
  ])
) as Record<keyof UserCarsTableRow, keyof CarFormFields>

export type FormFieldComponentsProps<TFieldValues extends FieldValues> = {
  index: number
  isCarLoading: boolean
  fields: FormFieldType<TFieldValues>[]
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  id: string | number | null
  watch: UseFormWatch<TFieldValues>
}

export type SavedCarAIResponseComponentsProps = {
  optionalCarFormValues: CarFormOptionalFields | null
  isSavingCarInProgress: boolean
  setIsSavingCarInProgress?: (boolValue: boolean) => void
  updateOptionalCarFormValues: (values: CarFormOptionalFields | null) => void
  id: string | number
  updateCarFormValues: (values: CarFormFields) => void
  carFormValues: CarFormFields | null
  triggerFetch?: () => void
}

export type AIResponseFormFieldProps = {
  formField: FormFieldType<CarFormOptionalFields>
  control: Control<CarFormOptionalFields>
  errors: FieldErrors
  watch: UseFormWatch<CarFormOptionalFields>
}

export type AIResponseFormFieldInputProps = Pick<
  AIResponseFormFieldProps,
  'formField' | 'control' | 'errors' | 'watch'
> & { field: ControllerRenderProps<CarFormOptionalFields>; isEditting: boolean }

export type FormFieldKey =
  | string
  | CarFormFieldsKeys
  | CarFormOptionalFieldsKeys
