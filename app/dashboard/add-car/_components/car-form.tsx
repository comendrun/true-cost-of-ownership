'use client'
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
import { saveCar } from '../_functions/actions'
import {
  isChekboxField,
  isInputField,
  isSelectField,
  isTextareaField
} from '../_functions/helper-functions'
import { openAICostsAnalysisCompletion } from '../_functions/openai/analysis-chat-completion'
import useGetCarById from '../_hooks/useGetCarById'
import {
  carFormSchema,
  CarFormValues,
  FormFieldType,
  FormStepsIDs
} from '../_types/types'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'
import NumberFormField from './NumberFormField'
import SelectFormField from './SelectFormField'
import TextInputFormField from './TextInputFormField'
import { LoadingDialogWithSpinner } from '../../../../components/ui/loading/LoadingDialogWithSpinner'

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
  const [isAnalysisGenerating, setIsAnalysisGenerating] = useState(false)
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

  async function handleGenerateAIAnalysis(): Promise<void> {
    if (id) {
      setIsAnalysisGenerating(true)
      try {
        const result = await openAICostsAnalysisCompletion({
          userCarId: id
        })
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
      } finally {
        setIsAnalysisGenerating(false)
      }
    }
  }

  return (
    <div className='min-h-[100vh] w-full flex-1 rounded-xl bg-muted/50 px-2 py-5 md:min-h-min'>
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
              onClick={handleGenerateAIAnalysis}
            >
              Generate the Car Analysis
            </Button>

            <Button className='w-full' type='submit' disabled={isCarLoading}>
              Save The Car
            </Button>
          </div>
        </form>
      </Form>
      {isAnalysisGenerating ? (
        <LoadingDialogWithSpinner
          open={isAnalysisGenerating}
          setIsOpen={setIsAnalysisGenerating}
          title='Please wait...'
          description='Please wait until the Analysis is generated.'
          withCloseButton={false}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
