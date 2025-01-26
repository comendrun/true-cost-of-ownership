'use client'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useCarFormStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { LoadingDialogWithSpinner } from '../../../../components/ui/loading/LoadingDialogWithSpinner'
import { advancedFormSteps } from '../_consts/consts'
import {
  saveCarAndGetRecommendations,
  updateCarAndGetRecommendations
} from '../_functions/actions'
import { openAICostsAnalysisCompletion } from '../_functions/openai/analysis-chat-completion'
import useGetCarById from '../_hooks/useGetCarById'
import {
  CarFormFields,
  CarFormOptionalFields,
  CarFormSchema,
  FormStepsIDs
} from '../_types/types'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'
import AdvancedFormFieldComponents from './advanced-form-field-components'
import SavedCarAIResponseDialog from './ai-response/saved-car-ai-response-dialog'
import { defaultCarFormValues } from '@/data/consts'

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
    isLoading: isCarLoading,
    triggerFetch
  } = useGetCarById(id)

  useEffect(() => {
    if (pageError) {
      return () => {
        toast.error(pageError)
        router.replace('/dashboard/add-car/advanced')
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
          window.location.replace('/dashboard/add-car/advanced')
        })
      }
    }
  }, [router])

  const {
    updateCarFormValues,
    setCarFormFieldValue,
    carFormValues: stateValues,
    clearStorage,
    isSavingCarInProgress,
    setIsSavingCarInProgress,
    updateOptionalCarFormValues,
    optionalCarFormValues
  } = useCarFormStore()

  const form = useForm<CarFormFields>({
    resolver: zodResolver(CarFormSchema),
    values: id ? (carEntryFormValues ?? stateValues ?? undefined) : undefined,
    mode: 'onTouched'
    // defaultValues: undefined
  })

  const onSubmit: SubmitHandler<CarFormFields> = async data => {
    setIsSavingCarInProgress(true)
    updateOptionalCarFormValues(null)
    updateCarFormValues(data)

    let carFormOptionalFields: CarFormOptionalFields | null = null
    let submitError: { message: string } | null
    let savedCarId: number
    if (id) {
      const result = await updateCarAndGetRecommendations<CarFormFields>(
        data,
        id
      )
      carFormOptionalFields = result.carFormOptionalFields
      submitError = result.error
      savedCarId = id as number
    } else {
      const result = await saveCarAndGetRecommendations(data)
      carFormOptionalFields = result.carFormOptionalFields
      submitError = result.error
      savedCarId = result?.id as number
    }

    if (submitError) {
      setIsSavingCarInProgress(false)
      console.log('submitError', submitError)

      return toast.error(submitError.message)
    }

    console.log('carFormOptionalFields', carFormOptionalFields)

    toast.success(
      id ? 'Car updated successfully!' : 'Car created successfully!'
    )
    updateOptionalCarFormValues(carFormOptionalFields)

    if (!id && savedCarId) {
      router.replace(`/dashboard/add-car/advanced?id=${savedCarId}`)
    }
  }

  async function handleReset() {
    clearStorage()
    reset(
      {},
      {
        keepDefaultValues: false,
        keepValues: false,
        keepErrors: false
      }
    )
    window.location.replace('/dashboard/add-car/advanced')
    console.log('form state', formState)
    toast.success('Form and URL have been reset successfully.')
  }

  const {
    handleSubmit,
    formState,
    control,
    getValues,
    setValue,
    trigger,
    getFieldState,
    setFocus,
    clearErrors,
    reset,
    watch,
    setError
  } = form
  console.log('formState', formState)

  const { errors, isLoading } = formState

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
    <>
      <div className='min-h-[100vh] w-full flex-1 rounded-xl bg-muted/50 px-2 py-5 md:min-h-min'>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='m-auto mt-5 flex w-full flex-col gap-8 p-5'
          >
            <Accordion
              value={step}
              type='single'
              collapsible
              className='w-full'
            >
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
                      <AdvancedFormFieldComponents
                        fields={fields}
                        key={`form-field-components-step-${title}-index-${index}`}
                        control={control}
                        errors={errors}
                        isCarLoading={isCarLoading}
                        index={index}
                        setValue={setValue}
                        getValues={getValues}
                        id={id}
                        watch={watch}
                      />
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
                onClick={handleReset}
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
      {isSavingCarInProgress && (
        <div className='flex h-full w-full items-center justify-center'>
          <SavedCarAIResponseDialog
            optionalCarFormValues={optionalCarFormValues}
            isSavingCarInProgress={isSavingCarInProgress}
            setIsSavingCarInProgress={setIsSavingCarInProgress}
            updateOptionalCarFormValues={updateOptionalCarFormValues}
            carFormValues={stateValues}
            updateCarFormValues={updateCarFormValues}
            id={id as string | number}
            triggerFetch={triggerFetch}
          />
        </div>
      )}
    </>
  )
}
