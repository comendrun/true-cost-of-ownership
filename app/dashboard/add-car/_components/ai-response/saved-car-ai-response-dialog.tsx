'use client'
import React, { Dispatch, SetStateAction } from 'react'
import {
  CarFormOptionalFields,
  CarFormOptionalFieldsSchema,
  OptionalAllCarFormFields,
  SavedCarAIResponseComponentsProps
} from '../../_types/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CircularSpinner from '@/components/ui/loading/spinner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SavedCarAIResponseForm from './ai-response-form'

export default function SavedCarAIResponseDialog({
  optionalCarFormValues,
  isSavingCarInProgress,
  setIsSavingCarInProgress,
  updateOptionalCarFormValues,
  carFormValues,
  updateCarFormValues,
  id,
  triggerFetch
}: SavedCarAIResponseComponentsProps) {
  return (
    <>
      <Dialog open>
        <DialogContent
          hideCloseButton
          className='mx-auto flex h-full max-h-[90vh] min-h-[60vh] w-max min-w-[350px] max-w-[95vw] flex-col'
        >
          <DialogHeader>
            <DialogTitle>Sugggested Values for the Empty fields</DialogTitle>
            <DialogDescription>
              Please inspect the recommended values and change them in case you
              have more acccurate estimation of the cost.
            </DialogDescription>
          </DialogHeader>

          <div className='flex h-[85%] w-full'>
            {optionalCarFormValues ? (
              <SavedCarAIResponseForm
                optionalCarFormValues={optionalCarFormValues}
                isSavingCarInProgress={isSavingCarInProgress}
                updateOptionalCarFormValues={updateOptionalCarFormValues}
                setIsSavingCarInProgress={setIsSavingCarInProgress}
                carFormValues={carFormValues}
                updateCarFormValues={updateCarFormValues}
                id={id}
                triggerFetch={triggerFetch}
              />
            ) : (
              // <div className='flex h-full max-h-[50vh] w-full flex-col gap-2 overflow-y-scroll'>
              // </div>
              //     <div className='flex flex-col items-center justify-center gap-5'>
              // </div>
              <div className='flex w-full items-center justify-center'>
                <CircularSpinner color='bg-primary' />
              </div>
            )}
          </div>
          {/* <DialogFooter>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  )
}
