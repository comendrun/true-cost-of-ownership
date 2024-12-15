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
  clearErrors
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
}) {
  const stepKeys = getStepFieldKeys(currentStep)
  const otherKeys = getKeysOutsideStep(currentStep)

  const errorFieldsLabels = extractErrorFieldsLabels(errors)

  async function handleFormNextStep() {
    console.log('stepKeys', stepKeys)
    const clearErrorsResult = clearErrors(otherKeys)
    const isValid = await trigger(stepKeys)

    if (!isValid || Object.entries(errors).length > 0) {
      toast.error('Some required fields are empty', {
        description: `Please make sure that the following fields are filled correctly: ${
          errorFieldsLabels?.map(fieldLabel => fieldLabel.label).flat() || ''
        }`
      })
      return
    }
    console.log('error', errors)

    onNextStep(id, index, setStep)
  }

  async function formStepsLabelOnClickHandler() {
    const isValid = await trigger(stepKeys)
    if (!isValid || Object.entries(errors).length > 0) {
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
