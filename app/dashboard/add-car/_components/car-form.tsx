/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import {
  CarFormValues,
  FormFieldType,
  FormStepsIDs,
  carFormSchema
} from '@/app/dashboard/add-car/_components/_types/types'
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
import NumberFormField from '@/components/ui/form/NumberFormField'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { carFormDefaultValues } from '@/data/consts'
import { useCarFormStore } from '@/lib/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { advancedFormSteps } from '../_consts/consts'
import {
  isChekboxField,
  isInputField,
  isSelectField,
  isTextareaField
} from '../_functions/helper-functions'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'

export default function CarForm() {
  const [step, setStep] = useState<FormStepsIDs>('generalInfo')

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: carFormDefaultValues
  })
  const updateState = useCarFormStore(state => state.updateState)
  const setCarFormFieldValue = useCarFormStore(
    state => state.setCarFormFieldValue
  )
  const onSubmit: SubmitHandler<CarFormValues> = data => {
    console.log('data', data)
    updateState(data)
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    trigger,
    getFieldState,
    setFocus,
    clearErrors
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
                key={index}
              >
                {fields.map((formField: FormFieldType) => {
                  if (isInputField(formField)) {
                    if (formField.type === 'number') {
                      return (
                        <NumberFormField
                          key={formField.key}
                          control={control}
                          errors={errors}
                          disabled={formField.infoField}
                          // disabled={!getValues().brand || !getValues().model}
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
                        <FormField
                          control={control}
                          name='variant'
                          // disabled={!getValues().brand}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                  <FormLabel
                                    className={`${formField.required && !formField.infoField ? 'required-field' : ''}`}
                                  >
                                    {formField.label}
                                  </FormLabel>
                                  <div className='col-span-3 flex w-full'>
                                    <FormControl>
                                      <Input
                                        type='text'
                                        placeholder='Variant'
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormDescription>
                                  {formField.formDescription}
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
                  }

                  if (isSelectField(formField)) {
                    return (
                      <FormField
                        key={formField.key}
                        control={control}
                        name={formField.key}
                        render={({ field }) => (
                          <FormItem className=''>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <FormLabel
                                className={`${formField.required && !formField.infoField ? 'required-field' : ''} col-span-1`}
                              >
                                {formField.label}
                              </FormLabel>
                              <div className='col-span-3 flex w-full'>
                                <FormControl>
                                  <Select
                                    {...field}
                                    value={field.value?.toString()}
                                    onValueChange={
                                      formField.type === 'number'
                                        ? value => field.onChange(Number(value))
                                        : field.onChange
                                    }
                                  >
                                    <SelectTrigger className='w-full'>
                                      <SelectValue
                                        placeholder={formField.placeholder}
                                      />
                                    </SelectTrigger>
                                    <SelectContent className='w-full'>
                                      {Array.isArray(formField.selectItems)
                                        ? formField.selectItems.map(
                                            (item, index) => (
                                              <SelectItem
                                                key={index}
                                                value={item}
                                              >
                                                {item}
                                              </SelectItem>
                                            )
                                          )
                                        : formField
                                            .selectItems(getValues())
                                            ?.map((item, index) => (
                                              <SelectItem
                                                key={index}
                                                value={item.toString()}
                                              >
                                                {item}
                                              </SelectItem>
                                            ))}
                                    </SelectContent>
                                  </Select>
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
                        )}
                      />
                    )
                  }

                  if (isChekboxField(formField)) {
                    return (
                      <FormField
                        key={formField.key}
                        control={control}
                        name={formField.key}
                        // disabled={!getValues().brand || !getValues().model}
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
                                      name={field.name}
                                      ref={field.ref}
                                      onBlur={field.onBlur}
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
                        key={formField.key}
                        control={control}
                        name={formField.key}
                        // disabled={!getValues().brand || !getValues().model}
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
                                      rows={4}
                                      placeholder={formField.placeholder}
                                      value={
                                        field.value as
                                          | string
                                          | number
                                          | readonly string[]
                                          | undefined
                                      }
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      name={field.name}
                                      ref={field.ref}
                                      disabled={field.disabled}
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
          <Button className='w-full' type='submit'>
            Save The Car
          </Button>
          <Button variant='outline' className='w-full'>
            Create a PIE Chart
          </Button>
        </div>
      </form>
    </Form>
  )
}
