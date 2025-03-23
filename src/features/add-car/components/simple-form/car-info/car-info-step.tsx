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
import { SimpleFormCarInfoSchema } from '@/features/add-car/types/add-car.simple.schema'
import { SimpleFormCarInfoType } from '@/features/add-car/types/add-car.simple.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function CarInfoStep() {
  const router = useRouter()

  const form = useForm<SimpleFormCarInfoType>({
    resolver: zodResolver(SimpleFormCarInfoSchema)
  })

  const onSubmit = async (data: SimpleFormCarInfoType) => {
    console.log('data', data)
  }

  const {
    control,
    formState: { errors, isLoading },
    watch
  } = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=''>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Car Information</CardTitle>
            <CardDescription>
              Add a new Vehicle to Monitor in three simple steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid w-full gap-4 md:grid-cols-2'>
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
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            {/* <Button variant='outline'>Previous Step</Button> */}
            <Button type='submit' className='ml-auto'>
              Next Step
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
