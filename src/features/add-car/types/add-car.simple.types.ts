import { z } from 'zod'
import {
  SimpleFormCarInfoSchema,
  SimpleFormDriverInfoSchema,
  SimpleFormFieldsSchema,
  SimpleFormFinancialInfoSchema
} from './add-car.simple.schema'

export type SimpleFormFields = z.infer<typeof SimpleFormFieldsSchema>

export type SimpleFormCarInfoType = z.infer<typeof SimpleFormCarInfoSchema>

export type SimpleFormFinancialInfo = z.infer<
  typeof SimpleFormFinancialInfoSchema
>
export type SimpleFormDriverInfo = z.infer<typeof SimpleFormDriverInfoSchema>
