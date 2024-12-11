/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form'
import { Input } from '../input'
import { FieldErrors } from 'react-hook-form'
import {
  CarFormValues,
  FormStepsIDs
} from '@/app/dashboard/add-car/_components/_types/types'

export default function NumberFormField({
  control,
  errors,
  disabled,
  label,
  inputSuffix,
  name,
  formDescription,
  required = false
}: {
  name: keyof CarFormValues
  label: string
  control: any
  errors: FieldErrors<CarFormValues>
  disabled?: boolean
  inputSuffix?: string
  formDescription?: string
  required: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        return (
          <FormItem>
            <div className='grid grid-cols-4 items-center gap-4'>
              <FormLabel
                className={`${required && !disabled ? 'required-field' : ''}`}
              >
                {label}
              </FormLabel>
              <div className='col-span-3 flex w-full items-center gap-2'>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.valueAsNumber)
                    }}
                    disabled={disabled}
                    // onChange={(e) => {
                    //   const { value } = e?.target;

                    //   if (/^\d*\.?\d{0,2}$/.test(value))
                    //     field.onChange(Number(value));
                    // }}
                    suffix={inputSuffix}
                  />
                </FormControl>
              </div>
            </div>
            <FormDescription>{formDescription}</FormDescription>
            <FormMessage>{errors?.[name]?.message}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
