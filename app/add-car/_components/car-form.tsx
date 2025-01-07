'use client'
import NumberFormField from '@/app/add-car/_components/NumberFormField'
import {
  CarFormValues,
  FormFieldType,
  FormStepsIDs,
  UserCarsTableRow,
  carFormSchema
} from '@/app/add-car/_types/types'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { carFormDefaultValues } from '@/data/consts'
import { useCarFormStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { advancedFormSteps } from '../_consts/consts'
import {
  isChekboxField,
  isInputField,
  isSelectField,
  isTextareaField
} from '../_functions/helper-functions'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'
import SelectFormField from './SelectFormField'
import TextInputFormField from './TextInputFormField'
import { saveCar } from '../actions'
import useGetCarById from '../_hooks/useGetCarById'

export default function CarForm() {
  const [step, setStep] = useState<FormStepsIDs>('generalInfo')

  const router = useRouter()
  const searchParams = useSearchParams()
  const id: string | number | null = searchParams.get('id')

  const { data: car, error, carEntryFormValues, isLoading: isCarLoading } = useGetCarById(id)

  const updateState = useCarFormStore(state => state.updateState)
  const setCarFormFieldValue = useCarFormStore(
    state => state.setCarFormFieldValue
  )
  const stateValues = useCarFormStore(state => state.carFormValues)

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    values: carEntryFormValues ?? undefined
  })

  const onSubmit: SubmitHandler<CarFormValues> = async data => {
    console.log('data', data)
    updateState(data)

    const savedCar: UserCarsTableRow | null = await saveCar(data, id)

    console.log('savedCar', savedCar)
  }

  const {
    handleSubmit,
    formState: { errors, isLoading },
    control,
    getValues,
    setValue,
    trigger,
    getFieldState,
    setFocus,
    clearErrors,
    reset,
    watch,
    
  } = form

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='m-auto mt-5 flex w-full flex-col gap-8 p-5'
      >
        <Accordion value={step} type='single' collapsible className='w-full'>
          {advancedFormSteps.map(({ id, title, fields, index }) => {
            return (
              <AdvancedFormAccordionItem
                id={id}
                title={title}
                index={index}
                setStep={setStep}
                trigger={trigger}
                errors={errors}
                currentStep={step}
                key={`${index}-${id}`}
                clearErrors={clearErrors}
                getFieldState={getFieldState}
              >
                {fields.map((formField: FormFieldType) => {
                  if (isInputField(formField)) {
                    if (formField.type === 'number') {
                      return (
                        <NumberFormField
                          key={`input-number-${index}-${formField.key}-${formField.label}`}
                          control={control}
                          errors={errors}
                          disabled={isCarLoading || formField.infoField}
                          label={formField.label}
                          inputSuffix={formField?.inputSuffix || ''}
                          name={formField.key}
                          formDescription={formField.formDescription}
                          required={formField.required}
                        />
                      )
                    }

                    if (formField.type === 'string') {
                      return (
                        <TextInputFormField
                          key={`input-number-${index}-${formField.key}-${formField.label}`}
                          control={control}
                          errors={errors}
                          disabled={isCarLoading || formField?.infoField}
                          label={formField.label}
                          inputSuffix={formField?.inputSuffix}
                          name={formField.key}
                          formDescription={formField.formDescription}
                          required={formField.required}
                          placeholder={formField?.placeholder}
                        />
                      )
                    }
                  }

                  if (isSelectField(formField)) {
                    return (
                      <SelectFormField
                        key={`${index}-${formField.key}-${formField.label}`}
                        control={control}
                        errors={errors}
                        disabled={isCarLoading || formField.disabled}
                        label={formField.label}
                        name={formField.key}
                        formDescription={formField.formDescription}
                        required={formField.required}
                        type={formField.type}
                        placeholder={formField.placeholder}
                        selectItems={formField.selectItems}
                        getValues={getValues}
                        watch={watch}
                      />
                    )
                  }

                  if (isChekboxField(formField)) {
                    return (
                      <FormField
                        key={`${index}-${formField.key}-${formField.label}`}
                        control={control}
                        name={formField.key}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <FormLabel
                                  className={`${formField.required ? 'required-field' : ''}`}
                                >
                                  {formField.label}
                                </FormLabel>
                                <div className='col-span-3 flex w-full items-center gap-2'>
                                  <FormControl>
                                    <Checkbox
                                      key={`checkbox-${index}-${formField.key}-${formField.label}`}
                                      type='button'
                                      checked={field.value as boolean}
                                      onCheckedChange={value => {
                                        if (!value)
                                          setValue(
                                            `${formField.key}`,
                                            undefined
                                          )
                                        field.onChange(value)
                                      }}
                                      {...fields}
                                      disabled={isCarLoading}
                                    />
                                  </FormControl>
                                </div>
                              </div>
                              <FormDescription>
                                {formField.formDescription}
                              </FormDescription>
                              <FormMessage>
                                {errors?.[formField?.key]?.message}
                              </FormMessage>
                            </FormItem>
                          )
                        }}
                      />
                    )
                  }

                  if (isTextareaField(formField)) {
                    return (
                      <FormField
                        key={`${index}-${formField.key}-${formField.label}`}
                        control={control}
                        name={formField.key}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <div className='mt-4 grid grid-cols-4 items-start gap-4'>
                                <FormLabel
                                  className={`${formField.required ? 'required-field' : ''} mt-2`}
                                >
                                  {formField.label}
                                </FormLabel>
                                <div className='col-span-3 flex w-full items-center gap-2'>
                                  <FormControl>
                                    <Textarea
                                      key={`textarea-${index}-${formField.key}-${formField.label}`}
                                      rows={4}
                                      placeholder={formField.placeholder}
                                      disabled={isCarLoading || field.disabled}
                                      {...field}
                                      value={
                                        field.value as
                                          | string
                                          | number
                                          | readonly string[]
                                          | undefined
                                      }
                                    />
                                  </FormControl>
                                </div>
                              </div>
                              <FormDescription>
                                {formField?.formDescription}
                              </FormDescription>
                              <FormMessage>
                                {errors?.[formField.key]?.message}
                              </FormMessage>
                            </FormItem>
                          )
                        }}
                      />
                    )
                  }
                })}
              </AdvancedFormAccordionItem>
            )
          })}
        </Accordion>

        <div className='flex w-full items-center justify-center gap-2'>
          <Button
            variant='destructive'
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString())
              params.delete('id')
              router.replace('/add-car/advanced')
            }}
            disabled={isCarLoading}
          >
            Start Over
          </Button>
          <Button
            className='w-full'
            variant='secondary'
            type='reset'
            onClick={() => {
              reset()
              toast.info('The fields has been reset. Feel free to start over.')
            }}
            disabled={isCarLoading}
          >
            Reset
          </Button>
          <Button className='w-full' variant='outline' disabled={isCarLoading}>
            Save The Car
          </Button>
          <Button variant='default' className='w-full' type='submit' disabled={isCarLoading}>
            Analyze the Car Costs
          </Button>
        </div>
      </form>
    </Form>
  )
}
