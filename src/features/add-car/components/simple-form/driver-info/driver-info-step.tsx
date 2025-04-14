'use client'
import DynamicFormFieldInput from '@/components/input-fields/dynamic-form-fields'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  simpleFormCarInfoFieldsKeys,
  simpleFormDriverInfoFields,
  simpleFormFinancialInfoFieldsKeys
} from '@/features/add-car/data/add-car.simple.fields'
import { useSimpleFormDataStore } from '@/features/add-car/hooks/simple-form.store'
import {
  SimpleFormDriverInfoSchema,
  SimpleFormFieldsSchema
} from '@/features/add-car/types/add-car.simple.schema'
import {
  SimpleFormCarInfoType,
  SimpleFormDriverInfo,
  SimpleFormFields,
  SimpleFormFinancialInfo
} from '@/features/add-car/types/add-car.simple.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SimpleFormStepCard from '../SimpleFormStepCard'
import { submitSimpleFormData } from '@/features/add-car/server/actions/submit-simple-form.server.action'
import { toast } from 'sonner'

export default function SimpleFormDriverInfoStep() {
  const router = useRouter()
  const formData = useSimpleFormDataStore(state => state.data)
  const setData = useSimpleFormDataStore(state => state.setData)
  const clearData = useSimpleFormDataStore(state => state.clearData)

  const form = useForm<SimpleFormDriverInfo>({
    resolver: zodResolver(SimpleFormDriverInfoSchema),
    defaultValues: {
      country: formData.country || 'GERMANY',
      driverAgeRange: formData.driverAgeRange,
      drivingExperienceYears: formData.drivingExperienceYears
    }
  })

  const onSubmit = async (data: SimpleFormDriverInfo) => {
    console.log('submitted data', { ...formData, ...data })
    setData(data)

    // const finalData: SimpleFormFields = {...formData, ...data}
    // console.log('finalData', finalData)

    console.log('data', data)
    console.log('formData', formData)

    const parsedData = SimpleFormFieldsSchema.safeParse(formData)

    console.log('parsed', parsedData)

    if (!parsedData.success) {
      toast.error(
        `There was an error while validating the form data: ${parsedData?.error?.message}`
      )
      return
    }

    const response = submitSimpleFormData(parsedData?.data)

    // clearData()
  }

  const {
    control,
    formState: { errors, isLoading },
    watch,
    reset
  } = form

  function onPreviousSimpleFormStep() {
    router.push('/dashboard/add-car/simple/finance')
  }

  useEffect(() => {
    if (!useSimpleFormDataStore.persist.hasHydrated) return

    const carInfoKeys =
      simpleFormCarInfoFieldsKeys as (keyof SimpleFormCarInfoType)[]
    const hasInvalidCarInfo = carInfoKeys.some(key => !formData?.[key])

    if (hasInvalidCarInfo) {
      router.push('/dashboard/add-car/simple/car')
      return
    }

    const financialInfoKeys =
      simpleFormFinancialInfoFieldsKeys as (keyof SimpleFormFinancialInfo)[]
    const hasInvalidFinancialInfo = financialInfoKeys.some(
      key => !formData?.[key]
    )

    if (hasInvalidFinancialInfo) {
      router.push('/dashboard/add-car/simple/finance')
      return
    }
  }, [formData, reset])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <SimpleFormStepCard
          cardTitle='Driver Information'
          cardDescription='Add a new Vehicle to Monitor in three simple steps.'
          cardFooter={
            <>
              <Button
                type='button'
                className=''
                variant='outline'
                onClick={onPreviousSimpleFormStep}
              >
                previous Step
              </Button>
              <Button type='submit' className='ml-auto'>
                Submit
              </Button>
            </>
          }
        >
          <>
            {simpleFormDriverInfoFields.map((formField, index) => {
              const {
                formDescription,
                component,
                key,
                label,
                required,
                type,
                disabled,
                fullWidth,
                infoField,
                placeholder
              } = formField

              return (
                <FormField
                  key={`simple-form-${index}-${formField.key}`}
                  control={control}
                  name={key}
                  render={({ field }) => {
                    const value =
                      typeof field.value === 'boolean' ? '' : field.value
                    const errorMessage = errors?.[key]?.message as
                      | string
                      | undefined
                    return (
                      <FormItem
                        className={`grid w-full grid-cols-4 items-center ${fullWidth ? 'col-span-2' : 'col-span-1'}`}
                      >
                        {/* <div className='grid grid-cols-4 items-center gap-4'> */}

                        <FormLabel
                          className={`${required && !disabled ? 'required-field' : ''} col-span-2`}
                        >
                          {label}
                        </FormLabel>
                        <FormControl className=''>
                          <div className='col-span-2'>
                            <DynamicFormFieldInput<SimpleFormDriverInfo>
                              errors={errors}
                              control={control}
                              formField={formField}
                              field={field}
                              watch={watch}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>{formDescription}</FormDescription>
                        <FormMessage>{errorMessage}</FormMessage>
                      </FormItem>
                    )
                  }}
                />
              )
            })}
          </>
        </SimpleFormStepCard>
      </form>
    </Form>
  )
}
