'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { aiResponseFormFields } from '../../consts/consts'
import {
  CarFormOptionalFields,
  CarFormOptionalFieldsSchema,
  SavedCarAIResponseComponentsProps
} from '../../../../../types/add-car/types'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useCarFormStore } from '@/lib/store'
import { toast } from 'sonner'
import { updateCar } from '../../functions/save-car-server-functions'
import AIResponseFormField from './ai-response-form-field'

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
    console.log('formValues', formValues)
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

  console.log('aiResponseField', aiResponseFormFields)

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
            The values are an average recommended by our AI agent..
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className=''>Label</TableHead>
              <TableHead className='w-[100px]'>Needs Editting?</TableHead>
              <TableHead className='w-[50%]'>Value</TableHead>
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
