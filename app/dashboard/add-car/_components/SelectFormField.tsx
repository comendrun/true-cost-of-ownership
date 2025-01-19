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
import { CarFormValues } from '../_types/types'
import { useEffect, useRef } from 'react'

export default function SelectFormField({
  control,
  errors,
  disabled,
  label,
  name,
  formDescription,
  required = false,
  type,
  placeholder,
  selectItems,
  getValues,
  watch,
  setValue,
  carId
}: {
  name: keyof CarFormValues
  label: string
  control: Control<CarFormValues>
  errors: FieldErrors<CarFormValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required: boolean
  type: 'string' | 'number' | 'boolean'
  placeholder?: string
  selectItems:
    | string[]
    | ((arg1: CarFormValues) => string[] | number[] | undefined)
  getValues: UseFormGetValues<CarFormValues>
  watch: UseFormWatch<CarFormValues>
  setValue: UseFormSetValue<CarFormValues>
  carId: string | number | null
}) {
  const isInitialMount = useRef(true) // Add useRef to track initial mount

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value !== undefined ? String(field.value) : ''
        return (
          <FormItem className=''>
            <div className='grid grid-cols-4 items-center gap-4'>
              <FormLabel
                className={`${required && !disabled ? 'required-field' : ''} col-span-1`}
              >
                {label}
              </FormLabel>
              <div className='col-span-3 flex w-full'>
                <FormControl>
                  <Select
                    {...field}
                    value={value}
                    onValueChange={value => {
                      if (name === 'model' || name === 'year') {
                        if (isInitialMount.current) {
                          isInitialMount.current = false
                          if (carId) return
                        }
                      }
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
                      {Array.isArray(selectItems)
                        ? selectItems.map((item, index) => (
                            <SelectItem key={`${index}-${item}`} value={item}>
                              {item}
                            </SelectItem>
                          ))
                        : selectItems(watch())?.map((item, index) => (
                            <SelectItem
                              key={`${index}-${item}`}
                              value={item.toString()}
                            >
                              {item}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
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
