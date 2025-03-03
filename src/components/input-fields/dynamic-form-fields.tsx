import {
  ControllerRenderProps,
  Control,
  FieldErrors,
  UseFormWatch,
  FieldValues,
  Path
} from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { FormFieldType } from '../types/add-car/types'
import { isSelectField } from '../pages/dashboard/add-car/functions/advanced-form-helper-functions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

export type DynamicFormFieldInputProps<TFieldValues extends FieldValues> = {
  formField: FormFieldType<TFieldValues>
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  watch: UseFormWatch<TFieldValues>
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  isEditting?: boolean
}

export default function DynamicFormFieldInput<
  TFieldValues extends FieldValues
>({
  formField,
  field,
  watch,
  isEditting
}: DynamicFormFieldInputProps<TFieldValues>) {
  const { component, type, disabled, infoField, placeholder } = formField

  const selectItems = component === 'select' ? formField.selectItems : undefined
  const inputSuffix = component === 'input' ? formField.inputSuffix : undefined

  //   console.log('selectItems', selectItems)

  const isFieldDisabled =
    infoField || disabled || (typeof isEditting === 'boolean' && !isEditting)

  console.log('isFieldDisabled', formField.key, isFieldDisabled)

  const inputValue = field.value ?? ''

  switch (component) {
    case 'input':
      return type === 'number' ? (
        <Input
          type='number'
          suffix={inputSuffix || ''}
          disabled={isFieldDisabled}
          {...field}
          onChange={e => field.onChange(e.target.valueAsNumber)}
          value={inputValue}
        />
      ) : (
        <Input
          type='text'
          placeholder={placeholder}
          {...field}
          value={inputValue}
          disabled={isFieldDisabled}
        />
      )

    case 'select':
      return (
        <Select
          {...field}
          value={String(field.value ?? '')}
          onValueChange={value =>
            field.onChange(type === 'number' ? Number(value) : value)
          }
          disabled={isFieldDisabled}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {isSelectField(formField) &&
              (Array.isArray(selectItems)
                ? selectItems.map((item, index) => (
                    <SelectItem key={index} value={String(item)}>
                      {item}
                    </SelectItem>
                  ))
                : selectItems?.(watch())?.map((item, index) => (
                    <SelectItem key={index} value={String(item)}>
                      {item}
                    </SelectItem>
                  )))}
          </SelectContent>
        </Select>
      )

    case 'textarea':
      return (
        <Textarea
          rows={4}
          placeholder={placeholder}
          disabled={isFieldDisabled}
          {...field}
          value={field.value as string | number | readonly string[] | undefined}
        />
      )

    default:
      return null
  }
}
