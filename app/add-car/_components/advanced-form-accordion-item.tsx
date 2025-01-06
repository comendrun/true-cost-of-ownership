import React, { ReactNode, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CarFormValues, FormStepsIDs } from '../_types/types'
import { onNextStep, onPreviousStep } from './helper-functions'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormTrigger
} from 'react-hook-form'
import { toast } from 'sonner'
import {
  extractErrorFieldsLabels,
  getKeysOutsideStep,
  getStepFieldKeys
} from '../_functions/helper-functions'
import { advancedFormSteps } from '../_consts/consts'

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
  errors: FieldErrors<CarFormValues>
  setStep: React.Dispatch<React.SetStateAction<FormStepsIDs>>
  trigger: UseFormTrigger<CarFormValues>
  currentStep: FormStepsIDs
  children: ReactNode
  clearErrors: UseFormClearErrors<CarFormValues>
  getFieldState: UseFormGetFieldState<CarFormValues>
}) {
  const stepKeys = getStepFieldKeys(currentStep)
  const otherKeys = getKeysOutsideStep(currentStep)

  // const errorFieldsLabels = extractErrorFieldsLabels(errors)

  async function handleFormNextStep() {
    const clearErrorsResult = clearErrors(otherKeys)
    const isValid = await trigger(stepKeys)

    const updatedErrors = stepKeys.reduce((acc, key) => {
      const fieldState = getFieldState(key)
      if (fieldState.error) acc[key] = fieldState.error
      return acc
    }, {} as FieldErrors<CarFormValues>)

    if (!isValid || Object.entries(updatedErrors).length > 0) {
      const errorFieldsLabels = extractErrorFieldsLabels(updatedErrors)
      toast.error('Some required fields are empty', {
        description: `Please make sure that the following fields are filled correctly: ${
          errorFieldsLabels?.map(fieldLabel => fieldLabel.label).flat() || ''
        }`
      })
      return
    }
    onNextStep(id, index, setStep)
  }

  async function formStepsLabelOnClickHandler() {
    const isValid = await trigger(stepKeys)

    const updatedErrors = stepKeys.reduce((acc, key) => {
      const fieldState = getFieldState(key)
      if (fieldState.error) acc[key] = fieldState.error
      return acc
    }, {} as FieldErrors<CarFormValues>)

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

  function handleFormPreviousStep() {
    onPreviousStep(id, index, setStep)
  }

  return (
    <AccordionItem value={id} id={id}>
      <AccordionTrigger
        onClick={formStepsLabelOnClickHandler}
        className='text-lg font-bold'
      >
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex h-full w-full flex-col gap-8'>{children}</div>

        <div className='mb-0 mt-6 flex w-full items-center justify-between'>
          <Button
            className='mr-auto'
            onClick={handleFormPreviousStep}
            disabled={currentStep === advancedFormSteps[0].id}
          >
            Previous Step
          </Button>

          {index !== 11 ? (
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
