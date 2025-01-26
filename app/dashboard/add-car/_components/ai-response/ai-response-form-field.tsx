import React, { useState } from 'react'
import {
  AIResponseFormFieldInputProps,
  AIResponseFormFieldProps,
  CarFormOptionalFields,
  FormFieldType
} from '../../_types/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@radix-ui/react-select'
import { watch } from 'fs'
import { isSelectField } from '../../_functions/helper-functions'
import { Textarea } from '@/components/ui/textarea'

export default function AIResponseFormField({
  formField,
  control,
  errors,
  watch
}: AIResponseFormFieldProps) {
  const [isEditting, setIsEditting] = useState(false)

  const {
    formDescription,
    component,
    key,
    label,
    required,
    type,
    disabled,
    fullWidth,
    infoField,
    placeholder
  } = formField

  const isCheckboxDisabled = disabled || infoField

  return (
    <TableRow key={formField.key}>
      <TableCell className='font-medium'>{formField.label}</TableCell>

      <TableCell>
        <div className='flex items-center gap-2'>
          {!isCheckboxDisabled && (
            <>
              <Checkbox
                id={`checkbox-${formField.key}`}
                onCheckedChange={e => setIsEditting(Boolean(e))}
                checked={isEditting}
                disabled={isCheckboxDisabled}
              />

              {/* <Label htmlFor={`checkbox-${formField.key}`}>
                Edit the suggestion
              </Label> */}
            </>
          )}
        </div>
      </TableCell>

      <TableCell>
        <FormField
          control={control}
          name={key}
          render={({ field }) => {
            const value = typeof field.value === 'boolean' ? '' : field.value
            const errorMessage = errors?.[key]?.message as string | undefined
            return (
              <FormItem>
                <FormControl>
                  <AIResponseFormFieldInput
                    errors={errors}
                    control={control}
                    formField={formField}
                    field={field}
                    watch={watch}
                    isEditting={isEditting}
                  />
                </FormControl>
                <FormDescription>{formDescription}</FormDescription>
                <FormMessage>{errorMessage}</FormMessage>
              </FormItem>
            )
          }}
        />
      </TableCell>
    </TableRow>
  )
}

function AIResponseFormFieldInput({
  formField,
  control,
  errors,
  field,
  watch,
  isEditting
}: AIResponseFormFieldInputProps) {
  const {
    formDescription,
    component,
    key,
    label,
    required,
    type,
    disabled,
    fullWidth,
    infoField,
    placeholder
  } = formField

  const isFieldDisabled = infoField || disabled || !isEditting
  switch (component) {
    case 'input':
      const inputValue =
        field.value === null || field.value === undefined ? '' : field.value
      if (type === 'string') {
        return (
          <Input
            // key={`input-string-${index}-${formField.key}-${formField.label}`}
            type='text'
            placeholder={placeholder}
            {...field}
            value={inputValue} // Ensure the value is of the correct type
            disabled={isFieldDisabled}
          />
        )
      } else if (type === 'number') {
        return (
          <Input
            type='number'
            suffix={formField?.inputSuffix || ''}
            disabled={isFieldDisabled}
            {...field}
            onChange={e => {
              field.onChange(e.target.valueAsNumber)
            }}
            value={inputValue}
          />
        )
      }
    case 'select':
      const selectValue = field.value !== undefined ? String(field.value) : ''

      return (
        <Select
          {...field}
          value={selectValue}
          onValueChange={value => {
            if (type === 'number') {
              return field.onChange(Number(value))
            } else {
              return field.onChange(value)
            }
          }}
          disabled={isFieldDisabled}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {isSelectField(formField) &&
              (Array.isArray(formField?.selectItems)
                ? formField?.selectItems.map((item, index) => (
                    <SelectItem key={`${index}-${item}`} value={item}>
                      {item}
                    </SelectItem>
                  ))
                : formField?.selectItems(watch())?.map((item, index) => (
                    <SelectItem
                      key={`${index}-${item}`}
                      value={item.toString()}
                    >
                      {item}
                    </SelectItem>
                  )))}
          </SelectContent>
        </Select>
      )
    case 'textarea':
      return (
        <Textarea
          key={`textarea-${key}-${label}`}
          rows={4}
          placeholder={formField.placeholder}
          disabled={isFieldDisabled}
          {...field}
          value={field.value as string | number | readonly string[] | undefined}
        />
      )
  }
}
