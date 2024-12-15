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
import { FieldErrors } from 'react-hook-form'

export default function TextInputFormField({
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
  control: any
  errors: FieldErrors<CarFormValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required: boolean
}) {
  return (
    <FormField
      control={control}
      name='variant'
      render={({ field }) => {
        return (
          <FormItem>
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
                    placeholder='Variant'
                    {...field}
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
