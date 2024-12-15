import { FieldErrors } from 'react-hook-form'
import {
  CarFormValues,
  CheckboxField,
  FormFieldType,
  FormStepsIDs,
  InputField,
  SelectField,
  TextareaField
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
  fuelConsumption,
  averageFuelCost,
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
  tuvCosts,
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

export const getStepFieldKeys = (stepId: FormStepsIDs) => {
  const step = advancedFormSteps.filter(s => s.id === stepId)[0]
  return step.fields.map(stepField => stepField.key)
}

export const isInputField = (field: FormFieldType): field is InputField =>
  field.component === 'input'

export const isSelectField = (field: FormFieldType): field is SelectField =>
  field.component === 'select'

export const isTextareaField = (field: FormFieldType): field is TextareaField =>
  field.component === 'textarea'

export const isChekboxField = (field: FormFieldType): field is CheckboxField =>
  field.component === 'checkbox'
