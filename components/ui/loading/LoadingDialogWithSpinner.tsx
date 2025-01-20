'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import CircularSpinner from '@/components/ui/loading/spinner'
import { X } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export function LoadingDialogWithSpinner({
  open,
  setIsOpen,
  title,
  description,
  withCloseButton = true
}: {
  open: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title: string | ReactNode
  description: string | ReactNode
  withCloseButton?: boolean
}) {
  return (
    <Dialog open={open}>
      <DialogContent hideCloseButton className='sm:max-w-[425px]'>
        <DialogHeader>
          {withCloseButton && (
            <DialogClose
              className='ml-auto flex'
              onClick={() => setIsOpen(false)}
            >
              <X />
            </DialogClose>
          )}
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className='mx-auto flex flex-col items-center justify-center'>
          <CircularSpinner color='bg-primary' size={50} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
