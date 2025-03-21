'use client'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { advancedFormSteps, formFields } from '@/consts/add-car-consts'
import { useCarFormStore } from '@/features/add-car/hooks/cars-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { convertUserCarsTableInsertToAdvancedFormValues } from '../../functions/advanced-form-helper-functions'
import AdvancedFormAccordionItem from '../advanced-form-accordion-item'
import AdvancedFormFieldComponents from '../advanced-form-field-components'
import GenerateAIAnalysisButton from '../ai-response/generate-ai-analysis-buttin'
import SavedCarAIResponseDialog from '../ai-response/saved-car-ai-response-dialog'
import CountrySelectField from '../country-select-field'
import { UserCarsTableRow } from '@/types/db.types'
import { SelectField } from '@/types/form-field.types'
import {
  updateCarAndGetRecommendations,
  saveCarAndGetRecommendations
} from '../../server/actions/save-car.server.actions'
import {
  FormStepsIDs,
  CarFormFields,
  CarFormSchema,
  CarFormOptionalFields
} from '../../types/add-cars.types'

export default function CarForm({
  id,
  user,
  carData
}: {
  id: string | number | null
  user: User | null
  carData?: UserCarsTableRow
}) {
  const [step, setStep] = useState<FormStepsIDs>('essentialInfo')
  const [isAnalysisGenerating, setIsAnalysisGenerating] = useState(false)
  const router = useRouter()

  const carEntryFormValues =
    convertUserCarsTableInsertToAdvancedFormValues(carData)

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
      router.replace(`/dashboard/my-cars/${savedCarId}/edit`)
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

  const countryField = formFields['country'] as SelectField<CarFormFields>

  return (
    <>
      <ScrollArea className='max-h-[90vh] w-full max-w-full rounded-md'>
        <div className='max-h-[100vh] w-full flex-1 overflow-y-scroll rounded-xl bg-muted/50 px-2 py-5 md:min-h-min'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='m-auto mt-5 flex w-full flex-col gap-8 p-5'
            >
              <div className='ml-auto w-max min-w-[350px] border-b border-primary p-3'>
                <CountrySelectField
                  carId={id}
                  control={control}
                  errors={errors}
                  getValues={getValues}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
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

                <GenerateAIAnalysisButton
                  carId={id}
                  isDisabled={isLoading || !id}
                />

                <Button className='w-full' type='submit' disabled={isLoading}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
          {/* {isAnalysisGenerating ? (
            <LoadingDialogWithSpinner
              open={isAnalysisGenerating}
              setIsOpen={setIsAnalysisGenerating}
              title='Please wait...'
              description='Please wait until the Analysis is generated.'
              withCloseButton={false}
            />
          ) : (
            <></>
          )} */}
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
