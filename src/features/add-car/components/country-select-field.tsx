import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { formFields } from '@/consts/add-car-consts'
import { useUserStore } from '@/hooks/users.store'
import { SelectField } from '@/types/form-field.types'
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import { CarFormFields } from '../types/add-cars.types'
import { UserConfig } from '@/types/user.types'

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
  const user = useUserStore(state => state.user)
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

  const userCountry = user?.config as UserConfig

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value =
          field.value !== undefined
            ? String(field.value)
            : (userCountry?.preferredCountry ?? 'GERMANY')
        const errorMessage = errors?.[name]?.message as string | undefined

        return (
          <FormItem className=''>
            <div className='ml-auto flex w-max min-w-full items-center gap-5'>
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
