import React, { MouseEvent, ReactNode, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CarFormFields, FormStepsIDs } from '../types/add-cars.types'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormTrigger
} from 'react-hook-form'
import { toast } from 'sonner'
import {
  onNextStep,
  onPreviousStep
} from '../functions/accordion-steps-helper-functions'
import { advancedFormSteps } from '../data/add-car.advanced.fields'
import {
  getKeysOutsideStep,
  extractErrorFieldsLabels,
  getStepFieldKeys
} from '../functions/advanced-form-helper-functions'

export default function AdvancedFormAccordionItem({
  title,
  id,
  index,
  setStep,
  currentStep,
  trigger,
  errors,
  children,
  clearErrors,
  getFieldState
}: {
  title: string
  id: FormStepsIDs
  index: number
  errors: FieldErrors<CarFormFields>
  setStep: React.Dispatch<React.SetStateAction<FormStepsIDs>>
  trigger: UseFormTrigger<CarFormFields>
  currentStep: FormStepsIDs
  children: ReactNode
  clearErrors: UseFormClearErrors<CarFormFields>
  getFieldState: UseFormGetFieldState<CarFormFields>
}) {
  const stepKeys = getStepFieldKeys(currentStep)
  const otherKeys = getKeysOutsideStep(currentStep)

  // const errorFieldsLabels = extractErrorFieldsLabels(errors)

  async function handleFormNextStep(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const clearErrorsResult = clearErrors(otherKeys)
    const isValid = await trigger(stepKeys)

    const updatedErrors = stepKeys.reduce((acc, key) => {
      const fieldState = getFieldState(key)
      if (fieldState.error) acc[key] = fieldState.error
      return acc
    }, {} as FieldErrors<CarFormFields>)

    if (!isValid || Object.entries(updatedErrors).length > 0) {
      const errorFieldsLabels = extractErrorFieldsLabels(updatedErrors)
      toast.error('Some required fields are empty', {
        description: `Please make sure that the following fields are filled correctly: ${
          errorFieldsLabels?.map(fieldLabel => fieldLabel.label).flat() || ''
        }`
      })
      return
    }
    onNextStep(id, index, setStep, advancedFormSteps)
  }

  async function formStepsLabelOnClickHandler(
    event: MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    const isValid = await trigger(stepKeys)

    const updatedErrors = stepKeys.reduce((acc, key) => {
      const fieldState = getFieldState(key)
      if (fieldState.error) acc[key] = fieldState.error
      return acc
    }, {} as FieldErrors<CarFormFields>)

    if (!isValid || Object.entries(errors).length > 0) {
      const errorFieldsLabels = extractErrorFieldsLabels(updatedErrors)
      toast.error('Some required fields are empty', {
        description: `Please make sure that the following fields are filled correctly: ${
          errorFieldsLabels?.map(fieldLabel => fieldLabel.label).flat() || ''
        }`
      })
      return
    }
    setStep(id)
  }

  function handleFormPreviousStep(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    onPreviousStep(id, index, setStep)
  }

  // function handleFormNextStep(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error('Function not implemented.')
  // }

  return (
    <AccordionItem value={id} id={id}>
      <AccordionTrigger
        onClick={formStepsLabelOnClickHandler}
        className='text-lg font-bold'
      >
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex h-full w-full flex-col gap-8 xl:grid xl:grid-cols-2 xl:gap-x-20'>
          {children}
        </div>

        <div className='mb-0 mt-6 flex w-full items-center justify-between'>
          <Button
            className='mr-auto'
            onClick={handleFormPreviousStep}
            disabled={currentStep === advancedFormSteps[0].id}
          >
            Previous Step
          </Button>

          {index < advancedFormSteps.length - 1 ? (
            <Button className='ml-auto' onClick={handleFormNextStep}>
              Next Step
            </Button>
          ) : (
            <></>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
