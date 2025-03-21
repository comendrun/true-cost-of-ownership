'use client'
import { Button } from '@/components/ui/button'
import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import { handleGenerateAIAnalysis } from '../../functions/car-form.helper.functions'
import { LucideIcon } from 'lucide-react'
import { LoadingDialogWithSpinner } from '@/components/ui/loading/LoadingDialogWithSpinner'

export default function GenerateAIAnalysisButton({
  isDisabled,
  carId,
  //   setState,
  icon,
  variant = 'outline',
  className
}: {
  isDisabled: boolean
  carId: string | number | null
  //   setState?: Dispatch<SetStateAction<boolean>>
  icon?: ReactElement
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  //   const Icon: LucideIcon = icon || <></>

  if (isLoading) {
    return (
      <LoadingDialogWithSpinner
        open={true}
        setIsOpen={setIsLoading}
        title='Please wait...'
        description='Please wait until the Analysis is generated.'
        withCloseButton={false}
      />
    )
  }

  return (
    <Button
      variant={variant}
      className={className}
      type='button'
      disabled={isDisabled}
      onClick={() => handleGenerateAIAnalysis(carId, setIsLoading)}
    >
      <div className='flex gap-3'>
        {icon && <span>{icon}</span>}
        <span>Generate the Car Analysis</span>
      </div>
    </Button>
  )
}
