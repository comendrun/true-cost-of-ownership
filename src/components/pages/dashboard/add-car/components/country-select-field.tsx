import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useRef } from 'react'
import { CarFormFields, SelectField } from '@/components/types/add-car/types'
import { formFields } from '@/consts/add-car-consts'

export default function CountrySelectField({
  control,
  errors,
  getValues,
  watch,
  setValue,
  carId
}: {
  control: Control<CarFormFields>
  errors: FieldErrors<CarFormFields>
  getValues: UseFormGetValues<CarFormFields>
  watch: UseFormWatch<CarFormFields>
  setValue: UseFormSetValue<CarFormFields>
  carId: string | number | null
}) {
  const {
    label,
    required,
    selectItems,
    type,
    disabled,
    formDescription,
    placeholder,
    key,
    component,
    fullWidth,
    infoField
  } = formFields['country'] as SelectField<CarFormFields>

  const name = key

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value !== undefined ? String(field.value) : ''
        const errorMessage = errors?.[name]?.message as string | undefined

        return (
          <FormItem className=''>
            <div className='w-max min-w-full flex items-center gap-5 ml-auto'>
              <FormLabel
                className={`${required && !disabled ? 'required-field' : ''} font-bold`}
              >
                {label}
              </FormLabel>
              <div className='col-span-3 flex w-full'>
                <FormControl>
                  <Select
                    {...field}
                    value={value}
                    onValueChange={value => {
                      if (type === 'number') {
                        return field.onChange(Number(value))
                      } else {
                        return field.onChange(value)
                      }
                    }}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      {Array.isArray(selectItems) &&
                        selectItems?.map((item, index) => (
                          <SelectItem key={`${index}-${item}`} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
            </div>
            <FormDescription>{formDescription}</FormDescription>
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
