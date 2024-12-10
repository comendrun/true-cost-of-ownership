/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel
} from '@/data/cars-data'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import NumberFormField from '@/components/ui/form/NumberFormField'
import { useCarFormStore } from '@/lib/store'
import { carFormDefaultValues } from '@/data/consts'
import {
  CarFormValues,
  FormFieldType,
  FormStepsIDs,
  advancedFormSteps,
  carFormSchema,
  isChekboxField,
  isInputField,
  isSelectField,
  isTextareaField
} from '@/app/dashboard/add-car/_components/_types/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import AdvancedFormAccordionItem from './advanced-form-accordion-item'

function calculateMonthlyPayment(
  remainingAmount: number,
  annualInterestRate: number,
  numYears: number
) {
  const monthlyRate = annualInterestRate / 100 / 12
  const totalPayments = numYears * 12
  return (
    (remainingAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments))
  )
}

// car brand, car model, car year, user interior score, user exterior score, purchase price, prepayment, remaining amount, interest rate, financing duration, initial price of the model, current used car price, depreciation amounted from the difference in prices, guarantee?, guarantee years?, service cost, offer on service costs, tires (winter, summer), tire costs (probably similar), TUV costs (probably similar), brakes change costs, insurance (vollkasko), taxes, fuel consumption, total planned KMs per year, extended warranty cost?, oil change costs (probably included in service costs)

export default function CarForm() {
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: carFormDefaultValues
  })

  const updateState = useCarFormStore(state => state.updateState)
  const setCarFormFieldValue = useCarFormStore(
    state => state.setCarFormFieldValue
  )
  // console.log('setCarFormFieldValue', setCarFormFieldValue('Hello'))

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
    trigger
  } = form

  useEffect(() => {
    const { purchasePrice, prepayment } = getValues()
    const remainingAmount = Number(purchasePrice) - Number(prepayment)
    setValue('remainingAmount', remainingAmount)
  }, [getValues().purchasePrice, getValues().prepayment, getValues, setValue])

  useEffect(() => {
    const {
      purchasePrice,
      remainingAmount,
      financingDuration,
      interestRate,
      prepayment
    } = getValues()

    const monthlyPayment = calculateMonthlyPayment(
      remainingAmount,
      interestRate,
      financingDuration
    )

    const totalAmountPaid = monthlyPayment * financingDuration * 12 + prepayment

    const totalInterestPaid = totalAmountPaid - purchasePrice

    setValue('truePurchasePrice', totalAmountPaid)
    setValue('totalInterestPaid', totalInterestPaid)
  }, [
    getValues().financingDuration,
    getValues().purchasePrice,
    getValues().remainingAmount,
    getValues().interestRate,
    getValues,
    setValue
  ])

  useEffect(() => {
    const {
      purchasePrice,
      initialPrice,
      year: carFirstRegistration
    } = getValues()
    const carAge = new Date().getFullYear() - carFirstRegistration
    const depreciationRate =
      (((initialPrice - purchasePrice) / initialPrice) * 100) / carAge

    if (depreciationRate > 0)
      setValue('depreciationRate', Number(depreciationRate.toFixed(2)))
  }, [getValues().initialPrice, getValues().purchasePrice, getValues, setValue])

  useEffect(() => {
    const {
      averageFuelCost,
      fuelConsumption,
      totalPlannedKMs,
      plannedYearsOfOwnership,
      serviceCosts,
      oilChangeCosts,
      tiresCosts,
      tuvCosts,
      insuranceCost,
      taxes,
      offerOnExtendedWarranty,
      extendedWarrantyCost,
      purchasePrice,
      truePurchasePrice,
      year,
      initialPrice
    } = getValues()

    let { depreciationRate } = getValues()

    if (!depreciationRate) {
      const carAge = new Date().getFullYear() - year
      depreciationRate =
        (((initialPrice - purchasePrice) / initialPrice) * 100) / carAge
    }

    // Estimate future resale value assuming constant depreciation
    const estimatedResaleValue =
      purchasePrice *
      Math.pow(1 - depreciationRate / 100, plannedYearsOfOwnership)

    const totalFinancingCost = truePurchasePrice - purchasePrice

    const totalDepreciationCost = purchasePrice - estimatedResaleValue

    const totalFuelCost =
      (totalPlannedKMs / 100) *
      fuelConsumption *
      averageFuelCost *
      plannedYearsOfOwnership

    const totalMaintenanceCost =
      (serviceCosts + oilChangeCosts + tiresCosts + tuvCosts) *
      plannedYearsOfOwnership

    const totalTaxCost = taxes * plannedYearsOfOwnership

    const totalInsuranceCost = insuranceCost * plannedYearsOfOwnership

    const totalWarrantyCost = offerOnExtendedWarranty
      ? extendedWarrantyCost || 0
      : 0

    const TCO =
      truePurchasePrice +
      totalFuelCost +
      totalMaintenanceCost +
      totalInsuranceCost +
      totalTaxCost +
      totalWarrantyCost -
      estimatedResaleValue

    setValue('tco', Number(TCO.toFixed(2)))
  }, [
    getValues().purchasePrice,
    getValues().prepayment,
    getValues().interestRate,
    getValues().financingDuration,
    getValues().totalPlannedKMs,
    getValues().fuelConsumption,
    getValues().averageFuelCost,
    getValues().plannedYearsOfOwnership,
    getValues().serviceCosts,
    getValues().oilChangeCosts,
    getValues().tiresCosts,
    getValues().tuvCosts,
    getValues().insuranceCost,
    getValues().taxes,
    getValues().extendedWarrantyCost,
    getValues().offerOnExtendedWarranty,
    getValues().depreciationRate,
    getValues,
    setValue
  ])

  const [step, setStep] = useState<FormStepsIDs>('generalInfo')

  console.log('step', step)

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='m-auto mt-5 flex w-full flex-col gap-8 divide-y-2 border p-5'
      >
        <Accordion value={step} type='single' collapsible className='w-full'>
          {advancedFormSteps.map(({ id, title, fields, index }) => {
            return (
              <AdvancedFormAccordionItem
                id={id}
                title={title}
                index={index}
                setStep={setStep}
              >
                {fields.map((formField: FormFieldType) => {
                  if (formField.key === 'brand') {
                    console.table(formField)
                  }
                  if (isInputField(formField)) {
                    if (formField.type === 'number') {
                      return (
                        <NumberFormField
                          control={control}
                          errors={errors}
                          // disabled={!getValues().brand || !getValues().model}
                          label={formField.label}
                          inputSuffix={formField?.inputSuffix || ''}
                          name={formField.key}
                          formDescription={formField.formDescription}
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
                                  <FormLabel>{formField.label}</FormLabel>
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
                        control={control}
                        name={formField.key}
                        render={({ field }) => (
                          <FormItem className=''>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <FormLabel className='col-span-1'>
                                {formField.label}
                              </FormLabel>
                              <div className='col-span-3 flex w-full'>
                                <FormControl>
                                  <Select
                                    {...field}
                                    value={field.value?.toString()}
                                    onValueChange={field.onChange}
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
                        control={control}
                        name={formField.key}
                        // disabled={!getValues().brand || !getValues().model}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <div className='grid grid-cols-4 items-center gap-4'>
                                <FormLabel>{formField.label}</FormLabel>
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
                        control={control}
                        name={formField.key}
                        // disabled={!getValues().brand || !getValues().model}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <div className='mt-4 grid grid-cols-4 items-start gap-4'>
                                <FormLabel className='mt-2'>
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
