/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarFormValues } from '@/app/add-car/_types/types'
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

export default function NumberFormField({
  control,
  errors,
  disabled,
  label,
  inputSuffix,
  name,
  formDescription,
  required = false
}: {
  name: keyof CarFormValues
  label: string
  control: Control<CarFormValues>
  errors: FieldErrors<CarFormValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        const value = typeof field.value === 'boolean' ? '' : field.value;
        return (
          <FormItem>
            <div className='grid grid-cols-4 items-center gap-4'>
              <FormLabel
                className={`${required && !disabled ? 'required-field' : ''}`}
              >
                {label}
              </FormLabel>
              <div className='col-span-3 flex w-full items-center gap-2'>
                <FormControl>
                  <Input
                    type='number'
                    suffix={inputSuffix}
                    disabled={disabled}
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.valueAsNumber)
                    }}
                    value={value}
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
