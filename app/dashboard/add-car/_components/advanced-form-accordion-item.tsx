import React, { ReactNode } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { FormStepsIDs } from './_types/types'
import { onNextStep, onPreviousStep } from './helper-functions'

export default function AdvancedFormAccordionItem({
  title,
  id,
  index,
  setStep,
  children
}: {
  title: string
  id: FormStepsIDs
  index: number
  setStep: React.Dispatch<React.SetStateAction<FormStepsIDs>>
  children: ReactNode
}) {
  return (
    <AccordionItem value={id} id={id}>
      <AccordionTrigger onClick={() => setStep(id)}>{title}</AccordionTrigger>
      <AccordionContent>
        <div className='h-full w-full'>{children}</div>

        <div className='my-2 flex w-full items-center justify-between'>
          <Button
            className=''
            onClick={() => onPreviousStep(id, index, setStep)}
          >
            Previous Step
          </Button>
          <Button className='' onClick={() => onNextStep(id, index, setStep)}>
            Next Step
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
