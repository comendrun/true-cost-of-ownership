'use client'
import DynamicFormFieldInput from '@/components/input-fields/dynamic-form-fields'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { simpleFormCarInfoFields } from '@/features/add-car/data/add-car.simple.fields'
import { useSimpleFormDataStore } from '@/features/add-car/hooks/simple-form.store'
import { SimpleFormCarInfoSchema } from '@/features/add-car/types/add-car.simple.schema'
import { SimpleFormCarInfoType } from '@/features/add-car/types/add-car.simple.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SimpleFormStepCard from '../SimpleFormStepCard'

export default function CarInfoStep() {
  const router = useRouter()

  const setData = useSimpleFormDataStore(state => state.setData)
  const formData = useSimpleFormDataStore(state => state.data)

  const form = useForm<SimpleFormCarInfoType>({
    resolver: zodResolver(SimpleFormCarInfoSchema),
    defaultValues: {
      fuelType: formData.fuelType ?? undefined,
      brand: formData.brand ?? undefined,
      model: formData.model ?? undefined,
      year: formData?.year ?? undefined,
      mileage: formData.mileage ?? undefined,
      totalPlannedKMs: formData.totalPlannedKMs ?? undefined
    }
  })

  const {
    control,
    formState: { errors, isLoading, submitCount },
    watch,
    setValue,
    reset,
    getFieldState
  } = form

  const onSubmit = async (data: SimpleFormCarInfoType) => {
    console.log('data', data)
    setData(data)
    router.push('/dashboard/add-car/simple/finance')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <SimpleFormStepCard
          cardDescription='Add a new Vehicle to Monitor in three simple steps.'
          cardTitle='Car Information'
          cardFooter={
            <Button type='submit' className='ml-auto'>
              Next Step
            </Button>
          }
        >
          <>
            {simpleFormCarInfoFields.map((formField, index) => {
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
                            <DynamicFormFieldInput<SimpleFormCarInfoType>
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
