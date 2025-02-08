'use client'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCarFormStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { LoadingDialogWithSpinner } from '../../../../ui/loading/LoadingDialogWithSpinner'
import { advancedFormSteps } from '../consts/consts'
import { convertUserCarsTableInsertToAdvancedFormValues } from '../functions/advanced-form-helper-functions'
import { openAICostsAnalysisCompletion } from '../../my-cars/functions/openai/analysis-chat-completion'
import {
  saveCarAndGetRecommendations,
  updateCarAndGetRecommendations
} from '../functions/save-car-server-functions'
import {
  CarFormFields,
  CarFormOptionalFields,
  CarFormSchema,
  FormStepsIDs,
  UserCarsTableRow
} from '../types/types'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'
import AdvancedFormFieldComponents from './advanced-form-field-components'
import SavedCarAIResponseDialog from './ai-response/saved-car-ai-response-dialog'

export default function CarForm({
  id,
  user,
  carData
}: {
  id: string | number | null
  user: User | null
  carData?: UserCarsTableRow
}) {
  const [step, setStep] = useState<FormStepsIDs>('generalInfo')
  const [isAnalysisGenerating, setIsAnalysisGenerating] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  // const {
  //   data: car,
  //   error,
  //   carEntryFormValues,
  //   isLoading: isCarLoading,
  //   triggerFetch
  // } = useGetCarById(id)
  const carEntryFormValues = convertUserCarsTableInsertToAdvancedFormValues(carData)

  // const { deleteCookieWithKey, cookie } = useCookie(FORM_ERROR_MESSAGE_KEY)

  // console.log('getCookie value', cookie?.value)
  // console.log('getCookie', cookie)

  // useEffect(() => {
  //   if (error) {
  //     console.log('in the if statement in the useeffect')
  //     return () => {
  //       toast.error(
  //         error?.message ||
  //           "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."
  //       )
  //       // router.replace('/dashboard/add-car/advanced')
  //     }
  //   }

  //   // if (cookie?.value) {
  //   //   const parsedCookie = JSON.parse(cookie?.value)
  //   //   if (parsedCookie?.id == id) {
  //   //     toast.error(
  //   //       parsedCookie?.message ||
  //   //         "You don't have access to this entity or an error occured while fetching the requested entry. Please start with a fresh form."
  //   //     )

  //   //     deleteCookieWithKey()
  //   //   }
  //   // }
  // }, [router, error, error?.message])

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
    console.log('submitting')

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
      router.replace(`/dashboard/my-car/${savedCarId}/edit`)
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
      <ScrollArea className='max-h-[90vh] max-w-full rounded-md w-full'>
        <div className='max-h-[100vh] w-full flex-1 overflow-y-scroll rounded-xl bg-muted/50 px-2 py-5 md:min-h-min'>
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
                          isCarLoading={isLoading}
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
                  disabled={isLoading}
                >
                  Reset
                </Button>

                <Button
                  variant='outline'
                  className='w-full'
                  type='button'
                  disabled={isLoading || !id}
                  onClick={handleGenerateAIAnalysis}
                >
                  Generate the Car Analysis
                </Button>

                <Button
                  className='w-full'
                  type='submit'
                  disabled={isLoading}
                >
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
              // triggerFetch={triggerFetch}
            />
          </div>
        )}
      </ScrollArea>
    </>
  )
}
