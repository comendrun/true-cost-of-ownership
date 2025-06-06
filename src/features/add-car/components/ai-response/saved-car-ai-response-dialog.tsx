'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import CircularSpinner from '@/components/ui/loading/spinner'

import SavedCarAIResponseForm from './ai-response-form'
import { SavedCarAIResponseComponentsProps } from '@/features/add-car/types/add-cars.types'

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
              <div className='flex w-full items-center justify-center'>
                <CircularSpinner color='bg-primary' />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
