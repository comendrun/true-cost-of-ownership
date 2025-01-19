'use client'
// import {
//   CarFormValues,
//   FormFieldType,
//   FormStepsIDs,
//   UserCarsTableRow,
//   carFormSchema
// } from '@/app/add-car/_types/types'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCarFormStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { advancedFormSteps } from '../_consts/consts'
import {
  isChekboxField,
  isInputField,
  isSelectField,
  isTextareaField
} from '../_functions/helper-functions'
import useGetCarById from '../_hooks/useGetCarById'
import { saveCar } from '../_functions/actions'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'
import TextInputFormField from './TextInputFormField'
import {
  carFormSchema,
  CarFormValues,
  FormFieldType,
  FormStepsIDs,
  UserCarsTableRow
} from '../_types/types'
import { openAICostsAnalysisCompletion } from '../_functions/openai/analysis-chat-completion'

export default function CarForm({
  id,
  user,
  pageError
}: {
  id: string | number | null
  user: User | null
  pageError: string | null
}) {
  const [step, setStep] = useState<FormStepsIDs>('generalInfo')
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    data: car,
    error,
    carEntryFormValues,
    isLoading: isCarLoading
  } = useGetCarById(id)

  useEffect(() => {
    if (pageError) {
      return () => {
        toast.error(pageError)
        router.replace('/dashboard/add-car/advanced')
      }
    }

    // if (id && !car) {
    //   const params = new URLSearchParams(searchParams.toString())
    //   params.delete('id')
    //   router.replace('/add-car/advanced')
    // }
  }, [router])

  const updateState = useCarFormStore(state => state.updateState)
  const setCarFormFieldValue = useCarFormStore(
    state => state.setCarFormFieldValue
  )
  const stateValues = useCarFormStore(state => state.carFormValues)

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    values: carEntryFormValues ?? undefined
  })

  const onSubmit: SubmitHandler<CarFormValues> = async data => {
    updateState(data)

    const { data: savedCar, error } = await saveCar(data, id)

    if (error) {
      return toast.error(error.message)
    }

    toast.success(
      id ? 'Car updated successfully!' : 'Car created successfully!'
    )

    if (!id) {
      router.replace(`/dashboard/add-car/advanced?id=${savedCar?.id}`)
    }
  }

  const {
    handleSubmit,
    formState: { errors, isLoading },
    control,
    getValues,
    setValue,
    trigger,
    getFieldState,
    setFocus,
    clearErrors,
    reset,
    watch
  } = form

  // if (pageError) {
  //   toast.error(pageError)
  //   // const params = new URLSearchParams(searchParams.toString())
  //   // params.delete('id')
  //   // return <CarForm id={null} user={user} pageError={null}
  //   router.replace('/add-car/advanced')
  // }

  return (
    <div className='min-h-[100vh] w-full flex-1 rounded-xl bg-muted/50 px-2 py-10 md:min-h-min'>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='m-auto mt-5 flex w-full flex-col gap-8 p-5'
        >
          <Accordion value={step} type='single' collapsible className='w-full'>
            {advancedFormSteps.map(
              ({ id: advancedFormStepId, title, fields, index }) => {
                return (
                  <AdvancedFormAccordionItem
                    id={advancedFormStepId}
                    title={title}
                    index={index}
                    setStep={setStep}
                    trigger={trigger}
                    errors={errors}
                    currentStep={step}
                    key={`${index}-${advancedFormStepId}`}
                    clearErrors={clearErrors}
                    getFieldState={getFieldState}
                  >
                    {fields.map((formField: FormFieldType) => {
                      if (isInputField(formField)) {
                        if (formField.type === 'number') {
                          return (
                            <NumberFormField
                              key={`input-number-${index}-${formField.key}-${formField.label}`}
                              control={control}
                              errors={errors}
                              disabled={
                                isCarLoading ||
                                formField.infoField ||
                                formField.disabled
                              }
                              label={formField.label}
                              inputSuffix={formField?.inputSuffix || ''}
                              name={formField.key}
                              formDescription={formField.formDescription}
                              required={formField.required}
                            />
                          )
                        }

                        if (formField.type === 'string') {
                          return (
                            <TextInputFormField
                              key={`input-number-${index}-${formField.key}-${formField.label}`}
                              control={control}
                              errors={errors}
                              disabled={isCarLoading || formField?.infoField}
                              label={formField.label}
                              inputSuffix={formField?.inputSuffix}
                              name={formField.key}
                              formDescription={formField.formDescription}
                              required={formField.required}
                              placeholder={formField?.placeholder}
                              fullWidth={formField?.fullWidth}
                            />
                          )
                        }
                      }

                      if (isSelectField(formField)) {
                        return (
                          <SelectFormField
                            key={`${index}-${formField.key}-${formField.label}`}
                            control={control}
                            errors={errors}
                            disabled={isCarLoading || formField.disabled}
                            label={formField.label}
                            name={formField.key}
                            formDescription={formField.formDescription}
                            required={formField.required}
                            type={formField.type}
                            placeholder={formField.placeholder}
                            selectItems={formField.selectItems}
                            getValues={getValues}
                            watch={watch}
                            setValue={setValue}
                            carId={id}
                          />
                        )
                      }

                      if (isChekboxField(formField)) {
                        return (
                          <FormField
                            key={`${index}-${formField.key}-${formField.label}`}
                            control={control}
                            name={formField.key}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <div className='grid grid-cols-4 items-center gap-4'>
                                    <FormLabel
                                      className={`${formField.required ? 'required-field' : ''}`}
                                    >
                                      {formField.label}
                                    </FormLabel>
                                    <div className='col-span-3 flex w-full items-center gap-2'>
                                      <FormControl>
                                        <Checkbox
                                          key={`checkbox-${index}-${formField.key}-${formField.label}`}
                                          type='button'
                                          checked={field.value as boolean}
                                          onCheckedChange={value => {
                                            if (!value)
                                              setValue(
                                                `${formField.key}`,
                                                undefined
                                              )
                                            field.onChange(value)
                                          }}
                                          {...fields}
                                          disabled={isCarLoading}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                  <FormDescription>
                                    {formField.formDescription}
                                  </FormDescription>
                                  <FormMessage>
                                    {errors?.[formField?.key]?.message}
                                  </FormMessage>
                                </FormItem>
                              )
                            }}
                          />
                        )
                      }

                      if (isTextareaField(formField)) {
                        return (
                          <FormField
                            key={`${index}-${formField.key}-${formField.label}`}
                            control={control}
                            name={formField.key}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <div className='mt-4 grid grid-cols-4 items-start gap-4'>
                                    <FormLabel
                                      className={`${formField.required ? 'required-field' : ''} mt-2`}
                                    >
                                      {formField.label}
                                    </FormLabel>
                                    <div className='col-span-3 flex w-full items-center gap-2'>
                                      <FormControl>
                                        <Textarea
                                          key={`textarea-${index}-${formField.key}-${formField.label}`}
                                          rows={4}
                                          placeholder={formField.placeholder}
                                          disabled={
                                            isCarLoading || field.disabled
                                          }
                                          {...field}
                                          value={
                                            field.value as
                                              | string
                                              | number
                                              | readonly string[]
                                              | undefined
                                          }
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                  <FormDescription>
                                    {formField?.formDescription}
                                  </FormDescription>
                                  <FormMessage>
                                    {errors?.[formField.key]?.message}
                                  </FormMessage>
                                </FormItem>
                              )
                            }}
                          />
                        )
                      }
                    })}
                  </AdvancedFormAccordionItem>
                )
              }
            )}
          </Accordion>

          <div className='flex w-full items-center justify-center gap-2'>
            {/* <Button
              variant='destructive'
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                params.delete('id')
                router.replace('/add-car/advanced')
              }}
              disabled={isCarLoading}
            >
              Start Over
            </Button> */}
            <Button
              className='w-full'
              variant='secondary'
              type='reset'
              onClick={() => {
                reset()
                toast.info(
                  'The fields has been reset. Feel free to start over.'
                )
              }}
              disabled={isCarLoading}
            >
              Reset
            </Button>

            <Button
              variant='outline'
              className='w-full'
              type='button'
              disabled={isCarLoading || !id}
              onClick={async () => {
                if (id) {
                  try {
                    ;('use server')
                    const result = await openAICostsAnalysisCompletion({
                      userCarId: id
                    })
                    console.log('result', result)
                    console.log('result type', typeof result)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (error: any) {
                    console.error(
                      'There was an error while generating the AI Analysis:',
                      error?.message
                    )
                    toast.error(
                      error.message ||
                        'There was an error while trying to generate the car analysis.'
                    )
                  }
                }
              }}
            >
              Generate the Car Analysis
            </Button>

            <Button className='w-full' type='submit' disabled={isCarLoading}>
              Save The Car
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
