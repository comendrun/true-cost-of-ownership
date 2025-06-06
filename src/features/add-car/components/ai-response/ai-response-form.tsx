'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useCarFormStore } from '@/features/add-car/hooks/cars-store'
import {
  CarFormOptionalFields,
  SavedCarAIResponseComponentsProps
} from '@/features/add-car/types/add-cars.types'
import { toast } from 'sonner'
import AIResponseFormField from './ai-response-form-field'
import { updateCar } from '../../server/actions/save-car.server.actions'
import { aiResponseFormFields } from '../../data/add-car.advanced.fields'
import { CarFormOptionalFieldsSchema } from '../../types/add-car.schemas'

export default function SavedCarAIResponseForm({
  optionalCarFormValues,
  isSavingCarInProgress,
  setIsSavingCarInProgress,
  updateOptionalCarFormValues,
  updateCarFormValues,
  carFormValues,
  id,
  triggerFetch
}: SavedCarAIResponseComponentsProps) {
  const clearLocalStorage = useCarFormStore(state => state.clearStorage)
  const form = useForm<CarFormOptionalFields>({
    resolver: zodResolver(CarFormOptionalFieldsSchema),
    values: optionalCarFormValues ?? undefined,
    mode: 'onTouched'
  })

  const {
    handleSubmit,
    formState: { errors, isLoading },
    control,
    getValues,
    setValue,
    watch
  } = form

  async function onSubmitHandler(formValues: CarFormOptionalFields) {
    const { error } = await updateCar<CarFormOptionalFields>(formValues, id)
    if (error) return toast.error(error.message)

    setIsSavingCarInProgress?.(false)
    updateOptionalCarFormValues(null)
    toast.success('The recommended values saved successfully.')
    clearLocalStorage()
    triggerFetch?.()
  }

  function handleDecline() {
    setIsSavingCarInProgress?.(false)
    updateOptionalCarFormValues(null)
    clearLocalStorage()
  }

  const changedFields =
    optionalCarFormValues &&
    Object.keys(optionalCarFormValues).reduce(
      (acc: Partial<CarFormOptionalFields>, key) => {
        const objectKey = key as keyof CarFormOptionalFields
        // console.table({
        //   optional: optionalCarFormValues?.[objectKey],
        //   car: carFormValues?.[objectKey]
        // })
        if (optionalCarFormValues?.[objectKey] !== carFormValues?.[objectKey])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          acc[objectKey] = optionalCarFormValues?.[objectKey] as any
        return acc
      },
      {} as Partial<CarFormOptionalFields>
    )

  const formFields = aiResponseFormFields.filter(
    ({ key }) => changedFields && Object.keys(changedFields).includes(key)
  )

  if (Object.keys(formFields).length === 0) {
    handleDecline()
    return <></>
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='flex h-full w-full flex-col gap-4'
      >
        <Table className=''>
          <TableCaption>
            The values are an average recommended by our AI agent.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className=''>Label</TableHead>
              <TableHead className='min-w-[100px]'>Needs Editing?</TableHead>
              <TableHead className='min-w-[50%]'>Value</TableHead>
              {/* <TableHead className='text-right'>Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {formFields.map(formField => {
              return (
                <AIResponseFormField
                  key={formField.key}
                  formField={formField}
                  control={control}
                  errors={errors}
                  watch={watch}
                />
              )
            })}
          </TableBody>
        </Table>
        <div className='ml-auto flex gap-2'>
          <Button type='button' variant='secondary' onClick={handleDecline}>
            Decline
          </Button>
          <Button type='submit'>Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}
