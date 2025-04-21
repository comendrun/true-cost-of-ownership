import { FormFieldType } from '@/types/form-field.types'
import {
  SimpleFormCarInfoType,
  SimpleFormDriverInfo,
  SimpleFormFinancialInfo
} from '../types/add-car.simple.types'
import { getFormField } from './fields'

export const simpleFormCarInfoFields: FormFieldType<SimpleFormCarInfoType>[] = [
  getFormField('brand', { fullWidth: true }), // Required
  getFormField('model'), // Required
  getFormField('year'), // Required
  getFormField('mileage'), // Required
  getFormField('fuelType'), // Required
  getFormField('totalPlannedKMs')
]

export const simpleFormFinancialInfoFields: FormFieldType<SimpleFormFinancialInfo>[] =
  [
    getFormField('purchasePrice'),
    getFormField('prepayment'),
    getFormField('plannedYearsOfOwnership')
  ]

export const simpleFormDriverInfoFields: FormFieldType<SimpleFormDriverInfo>[] =
  [
    getFormField('driverAgeRange'),
    getFormField('drivingExperienceYears'),
    getFormField('country')
  ]

export const simpleFormCarInfoFieldsKeys = simpleFormCarInfoFields.map(
  field => field.key
)

export const simpleFormFinancialInfoFieldsKeys: string[] =
  simpleFormFinancialInfoFields.map(field => field.key)

export const simpleFormDriverInfoFieldsKeys: string[] =
  simpleFormDriverInfoFields.map(field => field.key)
