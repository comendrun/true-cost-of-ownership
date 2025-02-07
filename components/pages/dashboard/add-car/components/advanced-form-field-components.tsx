'use client'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@radix-ui/react-checkbox'
import { FieldValues } from 'react-hook-form'
import {
  isInputField,
  isSelectField,
  isChekboxField,
  isTextareaField
} from '../functions/advanced-form-helper-functions'
import { FormFieldComponentsProps, FormFieldType } from '../types/types'
import NumberFormField from './NumberFormField'
import TextInputFormField from './TextInputFormField'
import SelectFormField from './SelectFormField'

export default function FormFieldComponents<TFieldValues extends FieldValues>({
  fields,
  control,
  errors,
  isCarLoading,
  index,
  setValue,
  getValues,
  id,
  watch
}: FormFieldComponentsProps<TFieldValues>) {
  return (
    <>
      {fields.map((formField: FormFieldType<TFieldValues>) => {
        if (isInputField<TFieldValues>(formField)) {
          if (formField.type === 'number') {
            return (
              <NumberFormField<TFieldValues>
                key={`input-number-${index}-${formField.key}-${formField.label}`}
                control={control}
                errors={errors}
                disabled={
                  isCarLoading || formField.infoField || formField.disabled
                }
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
              <TextInputFormField<TFieldValues>
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
                fullWidth={formField?.fullWidth}
              />
            )
          }
        }

        if (isSelectField<TFieldValues>(formField)) {
          return (
            <SelectFormField<TFieldValues>
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
              setValue={setValue}
              carId={id}
            />
          )
        }

        if (isChekboxField<TFieldValues>(formField)) {
          return (
            <FormField
              key={`${index}-${formField.key}-${formField.label}`}
              control={control}
              name={formField.key}
              render={({ field }) => {
                const errorMessage = errors?.[formField.key]?.message as
                  | string
                  | undefined
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
                              // if (!value) setValue(formField.key, undefined)
                              field.onChange(value)
                            }}
                            {...field}
                            disabled={isCarLoading}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <FormDescription>
                      {formField.formDescription}
                    </FormDescription>
                    <FormMessage>{errorMessage}</FormMessage>
                  </FormItem>
                )
              }}
            />
          )
        }

        if (isTextareaField<TFieldValues>(formField)) {
          return (
            <FormField
              key={`${index}-${formField.key}-${formField.label}`}
              control={control}
              name={formField.key}
              render={({ field }) => {
                const errorMessage = errors?.[formField.key]?.message as
                  | string
                  | undefined
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
                    <FormMessage>{errorMessage}</FormMessage>
                  </FormItem>
                )
              }}
            />
          )
        }
      })}
    </>
  )
}
