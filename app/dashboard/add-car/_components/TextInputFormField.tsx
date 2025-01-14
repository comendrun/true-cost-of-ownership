import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldErrors } from 'react-hook-form'
import { CarFormValues } from '../_types/types'

export default function TextInputFormField({
  control,
  errors,
  disabled,
  label,
  inputSuffix,
  name,
  formDescription,
  placeholder,
  required = false,
  fullWidth
}: {
  name: keyof CarFormValues
  label: string
  control: Control<CarFormValues>
  errors: FieldErrors<CarFormValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required: boolean
  placeholder?: string
  fullWidth?: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = typeof field.value === 'boolean' ? '' : field.value
        return (
          <FormItem className={`${fullWidth ? 'col-span-2' : ''}`}>
            <div className='grid grid-cols-4 items-center gap-4'>
              <FormLabel
                className={`${required && !disabled ? 'required-field' : ''}`}
              >
                {label}
              </FormLabel>
              <div className='col-span-3 flex w-full'>
                <FormControl>
                  <Input
                    // key={`input-string-${index}-${formField.key}-${formField.label}`}
                    type='text'
                    placeholder={placeholder}
                    {...field}
                    value={value} // Ensure the value is of the correct type
                  />
                </FormControl>
              </div>
            </div>
            <FormDescription>{formDescription}</FormDescription>
            <FormMessage>{errors?.[name]?.message}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
