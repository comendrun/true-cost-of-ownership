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
} from '@/app/dashboard/add-car/_types/types'
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
                  if (isInputField(formField)) {
                    if (formField.type === 'number') {
                      return (
                        <NumberFormField
                          control={control}
                          errors={errors}
                          disabled={!getValues().brand || !getValues().model}
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
                          disabled={!getValues().brand}
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
                        name='brand'
                        render={({ field }) => (
                          <FormItem className=''>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <FormLabel className='col-span-1'>
                                Car Brand
                              </FormLabel>
                              <div className='col-span-3 flex w-full'>
                                <FormControl>
                                  <Select
                                    {...field}
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
                        disabled={!getValues().brand || !getValues().model}
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
                        disabled={!getValues().brand || !getValues().model}
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

        <h2 className='text-xl font-bold'>Vehicle Information</h2>
        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>General Information</p>

          {/* list of the items in the page */}
          {/* Car Model */}
          <FormField
            control={control}
            name='brand'
            render={({ field }) => (
              <FormItem className=''>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='col-span-1'>Car Brand</FormLabel>
                  <div className='col-span-3 flex w-full'>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a Car Brand' />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                          {getAllBrands().map((brand, index) => (
                            <SelectItem key={index} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormDescription>
                  Select a car brand, from the list of the available options.
                </FormDescription>
                <FormMessage>{errors.brand?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='model'
            disabled={!getValues().brand}
            render={({ field }) => {
              const values = getValues()
              const brand = values?.brand
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Car Model</FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Select
                          {...field}
                          // value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='Select a Car Model' />
                          </SelectTrigger>
                          <SelectContent>
                            {getModelsByBrand(brand)?.map((model, index) => (
                              <SelectItem key={index} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    Please first select the car brand to be able to select Car
                    Model.
                  </FormDescription>
                  <FormMessage>{errors.model?.message}</FormMessage>
                </FormItem>
              )
            }}
          />

          <FormField
            control={control}
            name='variant'
            disabled={!getValues().brand}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Variant</FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Input type='text' placeholder='Variant' {...field} />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.variant?.message}</FormMessage>
                </FormItem>
              )
            }}
          />

          {/* year */}
          <FormField
            control={control}
            name='year'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              const values = getValues()
              const brand = values?.brand
              const model = values?.model
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>First Registration Year</FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value.toString()}
                          onValueChange={value => field.onChange(Number(value))}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='First Registration' />
                          </SelectTrigger>
                          <SelectContent>
                            {getYearsByBrandAndModel(brand, model)?.map(
                              (year, index) => (
                                <SelectItem key={index} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    Please select the year that the car was first registered in.
                  </FormDescription>
                  <FormMessage>{errors.year?.message}</FormMessage>
                </FormItem>
              )
            }}
          />

          {/* mileage */}
          <NumberFormField
            control={control}
            errors={errors}
            disabled={!getValues().brand || !getValues().model}
            label='Mileage'
            inputSuffix='Kilometers'
            name='mileage'
            formDescription='How many Kilometers has this car been used for?'
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>Personal Opinion</p>

          {/* interiorScore */}
          <FormField
            control={control}
            name='interiorScore'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Interior Design</FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Select
                          {...field}
                          value={field?.value?.toString()}
                          onValueChange={value => field.onChange(Number(value))}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='Interior score' />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(
                              (rate, index) => (
                                <SelectItem key={index} value={rate.toString()}>
                                  {rate}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    {' '}
                    How do you rate the Interior Design of the car?
                  </FormDescription>
                  <FormMessage>{errors.interiorScore?.message}</FormMessage>
                </FormItem>
              )
            }}
          />
          {/* exteriorScore */}
          <FormField
            control={control}
            name='exteriorScore'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Exterior Design </FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Select
                          {...field}
                          value={field?.value?.toString()}
                          onValueChange={value => field.onChange(Number(value))}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='Exterior Design score' />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(
                              (rate, index) => (
                                <SelectItem key={index} value={rate.toString()}>
                                  {rate}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    {' '}
                    How do you rate the Exterior Design of the car?
                  </FormDescription>
                  <FormMessage>{errors.exteriorScore?.message}</FormMessage>
                </FormItem>
              )
            }}
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>Finance</p>
          {/* purchasePrice */}
          <NumberFormField
            control={control}
            errors={errors}
            name='purchasePrice'
            label='Price'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='How much does the vehicle in total costs?'
          />
          {/* prepayment */}
          <NumberFormField
            control={control}
            errors={errors}
            name='prepayment'
            label='Prepayment'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='How much are you planning on paying upfront?'
          />
          {/* remainingAmount */}
          <NumberFormField
            control={control}
            errors={errors}
            name='remainingAmount'
            label='Remaining amount'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='The credit amount.'
          />
          {/* interestRate */}
          <NumberFormField
            control={control}
            errors={errors}
            name='interestRate'
            label='Interest Rate'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Percentage'
            formDescription='How much do you have to pay in interest for the taken credit?'
          />
          {/* financingDuration */}
          <NumberFormField
            control={control}
            errors={errors}
            name='financingDuration'
            label='Financing Duration'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Years'
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>The Car Depreciation Fields</p>
          {/* initialPrice */}
          <NumberFormField
            control={control}
            errors={errors}
            name='initialPrice'
            label='Original Initial Price'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='How much was the car originally sold for?'
          />
          {/* depreciationRate */}
          <NumberFormField
            control={control}
            errors={errors}
            name='depreciationRate'
            label='The car price depreciation rate'
            disabled
            inputSuffix='Percentage'
            formDescription='How much the car has depreciated, per year.'
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>Guarantee and Service</p>
          <NumberFormField
            control={control}
            errors={errors}
            name='guaranteeYears'
            label='How many years of Warranty does the car have?'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Years'
          />
          <NumberFormField
            control={control}
            errors={errors}
            name='serviceCosts'
            label='How much on average the car service costs?'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='There might be a difference between the service done at the manufacturer and in private shops.'
          />
          {/* serviceIncludes */}
          <FormField
            control={control}
            name='serviceIncludes'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='mt-4 grid grid-cols-4 items-start gap-4'>
                    <FormLabel className='mt-2'>
                      Which services are included in the company regular service
                      checks?
                    </FormLabel>
                    <div className='col-span-3 flex w-full items-center gap-2'>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder='Service Package'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    In case the company is offering a regular service, which
                    items are being inspected and checked on each visit?
                  </FormDescription>
                  <FormMessage>{errors.serviceIncludes?.message}</FormMessage>
                </FormItem>
              )
            }}
          />
          <NumberFormField
            control={control}
            errors={errors}
            name='oilChangeCosts'
            label='How much on average changing the car oil costs?'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
          />

          {/* offerOnExtendedWarranty */}
          <FormField
            control={control}
            name='offerOnExtendedWarranty'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>
                      Does company allow for extending the warranty?
                    </FormLabel>
                    <div className='col-span-3 flex w-full items-center gap-2'>
                      <FormControl>
                        <Checkbox
                          type='button'
                          checked={field.value}
                          onCheckedChange={value => {
                            if (!value)
                              setValue('extendedWarrantyCost', undefined)
                            field.onChange(value)
                          }}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>
                    {errors.offerOnExtendedWarranty?.message}
                  </FormMessage>
                </FormItem>
              )
            }}
          />

          {/* extendedWarrantyCost */}
          <NumberFormField
            control={control}
            errors={errors}
            name='extendedWarrantyCost'
            label=' How much extending car guarantee by the manufacturer
                      costs?'
            disabled={
              !getValues().brand ||
              !getValues().model ||
              !getValues().offerOnExtendedWarranty
            }
            inputSuffix='Euros'
            formDescription='If the manufacturer is offering such possibility.'
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>Efficiency</p>
          <NumberFormField
            control={control}
            errors={errors}
            name='plannedYearsOfOwnership'
            label='Planned Ownership time in years'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Years'
          />
          <NumberFormField
            control={control}
            errors={errors}
            name='totalPlannedKMs'
            label='Planned traveling distance per year?'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Kilometers'
            formDescription='How many Kilometers are you planning to drive this car, per year?'
          />
          <NumberFormField
            control={control}
            errors={errors}
            name='fuelConsumption'
            label='Fuel per 100KM?'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Liters'
            formDescription='How much fuel does the car burn per 100 Kilometers of travel?'
          />
          {/* fuelType */}
          <FormField
            control={control}
            name='fuelType'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Fuel Type</FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Select
                          {...field}
                          value={field?.value?.toString()}
                          onValueChange={value => field.onChange(value)}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='Fuel Type' />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              'Diesel',
                              'Petrol',
                              'Hybrid/Diesel',
                              'Hybrid/Petrol',
                              'Electric'
                            ]?.map((fuelType, index) => (
                              <SelectItem
                                key={index}
                                value={fuelType.toString()}
                              >
                                {fuelType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.fuelType?.message}</FormMessage>
                </FormItem>
              )
            }}
          />
          {/* averageFuelCost */}
          <NumberFormField
            control={control}
            errors={errors}
            name='averageFuelCost'
            label='Average Fuel cost?'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='How much a liter of the fuel type cost? for electric
                    vehicles, put the cost of each full charge.'
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>Insurance</p>

          {/* insuranceType */}
          <FormField
            control={control}
            name='insuranceType'
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Insurance Type</FormLabel>
                    <div className='col-span-3 flex w-full'>
                      <FormControl>
                        <Select
                          {...field}
                          value={field?.value?.toString()}
                          onValueChange={value => field.onChange(value)}
                        >
                          <SelectTrigger className=''>
                            <SelectValue placeholder='Fuel Type' />
                          </SelectTrigger>
                          <SelectContent>
                            {['Minimum', 'Partial', 'Full']?.map(
                              (type, index) => (
                                <SelectItem key={index} value={type.toString()}>
                                  {type}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.insuranceType?.message}</FormMessage>
                </FormItem>
              )
            }}
          />
          {/* insuranceCost */}
          <NumberFormField
            control={control}
            errors={errors}
            name='insuranceCost'
            label='Insurance Cost'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='Per Year.'
          />
        </div>

        <div className='my-5 flex flex-col gap-4'>
          <p className='mt-4'>Other</p>
          <NumberFormField
            control={control}
            errors={errors}
            name='tuvCosts'
            label='TÜV Costs'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='Per Year.'
          />
          <NumberFormField
            control={control}
            errors={errors}
            name='tiresCosts'
            label='Tires Costs'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='Per Year. (Probably the same number for different cars depending on the wheel size)'
          />
          {/* taxes */}
          <NumberFormField
            control={control}
            errors={errors}
            name='taxes'
            label='Taxes'
            disabled={!getValues().brand || !getValues().model}
            inputSuffix='Euros'
            formDescription='Per Year.'
          />
        </div>

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
