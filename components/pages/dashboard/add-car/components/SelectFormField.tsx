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
import { CarFormFields } from '../../../../types/add-car/types'
import { useEffect, useRef } from 'react'

export default function SelectFormField<TFieldValues extends FieldValues>({
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
  name: Path<TFieldValues>
  label: string
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required: boolean
  type: 'string' | 'number' | 'boolean'
  placeholder?: string
  selectItems:
    | string[]
    | ((arg1: TFieldValues) => string[] | number[] | undefined)
  getValues: UseFormGetValues<TFieldValues>
  watch: UseFormWatch<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  carId: string | number | null
}) {
  const isInitialMount = useRef(true) // Add useRef to track initial mount

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value !== undefined ? String(field.value) : ''
        const errorMessage = errors?.[name]?.message as string | undefined

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
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
