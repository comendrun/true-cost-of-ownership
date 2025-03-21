import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form'

export default function NumberFormField<TFieldValues extends FieldValues>({
  control,
  errors,
  disabled,
  label,
  inputSuffix,
  name,
  formDescription,
  required = false
}: {
  name: Path<TFieldValues>
  label: string
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required?: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value =
          field.value === null || field.value === undefined ? '' : field.value
        const errorMessage = errors?.[name]?.message as string | undefined // Safely extract the error message

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
                      const value = e.target.value
                      // If the input is empty, set the value to null (or empty string)
                      field.onChange(value === '' ? null : parseFloat(value))
                    }}
                    value={value}
                  />
                </FormControl>
              </div>
            </div>
            {formDescription && (
              <FormDescription>{formDescription}</FormDescription>
            )}
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
          </FormItem>
        )
      }}
    />
  )
}
