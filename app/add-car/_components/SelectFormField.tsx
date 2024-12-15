import { CarFormValues } from '@/app/add-car/_types/types'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { FieldErrors, UseFormGetValues } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

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
  getValues
}: {
  name: keyof CarFormValues
  label: string
  control: any
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
}) {
  return (
    <FormField
      //   key={`${index}-${formField.key}-${formField.label}`}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=''>
          <div className='grid grid-cols-4 items-center gap-4'>
            <FormLabel
              className={`${disabled ? 'required-field' : ''} col-span-1`}
            >
              {label}
            </FormLabel>
            <div className='col-span-3 flex w-full'>
              <FormControl>
                <Select
                  //   key={`select-${index}-${formField.key}-${formField.label}`}
                  {...field}
                  value={field.value?.toString()}
                  onValueChange={
                    type === 'number'
                      ? value => field.onChange(Number(value))
                      : field.onChange
                  }
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
                      : selectItems(getValues())?.map((item, index) => (
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
      )}
    />
  )
}
