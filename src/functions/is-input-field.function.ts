import {
  FormFieldType,
  InputField,
  SelectField,
  TextareaField,
  CheckboxField
} from '@/types/form-field.types'

export const isInputField = <TFieldValues>(
  field: FormFieldType<TFieldValues>
): field is InputField<TFieldValues> => field.component === 'input'

export const isSelectField = <TFieldValues>(
  field: FormFieldType<TFieldValues>
): field is SelectField<TFieldValues> => field.component === 'select'

export const isTextareaField = <TFieldValues>(
  field: FormFieldType<TFieldValues>
): field is TextareaField<TFieldValues> => field.component === 'textarea'

export const isChekboxField = <TFieldValues>(
  field: FormFieldType<TFieldValues>
): field is CheckboxField<TFieldValues> => field.component === 'checkbox'
