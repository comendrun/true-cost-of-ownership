import { FieldValues, Path } from 'react-hook-form'

type BaseField<TFieldValues> = {
  key: Path<TFieldValues> // Keys of the provided form fields type
  type: 'string' | 'number' | 'boolean' // Type of the returned value
  required: boolean
  label: string
  disabled?: boolean
  formDescription?: string
  infoField?: boolean
  placeholder?: string
  fullWidth?: boolean
}

export type InputField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'input'
  inputSuffix?: string
}

export type SelectField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'select'
  placeholder?: string
  selectItems:
    | string[]
    | ((arg1: TFieldValues) => string[] | number[] | undefined)
}

export type TextareaField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'textarea'
  placeholder?: string
}

export type CheckboxField<TFieldValues> = BaseField<TFieldValues> & {
  component: 'checkbox'
}

export type FormFieldType<TFieldValues = FieldValues> =
  | InputField<TFieldValues>
  | SelectField<TFieldValues>
  | TextareaField<TFieldValues>
  | CheckboxField<TFieldValues>
