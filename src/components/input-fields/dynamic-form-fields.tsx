import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormWatch
} from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { FormFieldType } from '@/types/form-field.types'
import { isSelectField } from '@/functions/is-input-field.function'

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

  const isFieldDisabled =
    infoField || disabled || (typeof isEditting === 'boolean' && !isEditting)

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
          onValueChange={value => {
            return field.onChange(type === 'number' ? Number(value) : value)
          }}
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
