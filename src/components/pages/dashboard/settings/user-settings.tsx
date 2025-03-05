'use client'
import DynamicFormFieldInput from '@/components/input-fields/dynamic-form-fields'
import {
  UserConfig,
  UserSettingsFields,
  UserSettingsSchema
} from '@/components/types/settings/types'
import { Form } from '@/components/ui/form'
import { settingsPageFields } from '@/consts/settings'
import { useUserStore } from '@/lib/users.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { updateUserProfile } from './settings.server.actions'
import { toast } from 'sonner'
import { useState } from 'react'

export default function UserSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const user = useUserStore(state => state.user)

  const userConfig = user?.config as UserConfig
  const values: UserSettingsFields = {
    email: user?.email ?? undefined,
    username: user?.username ?? undefined,
    firstName: user?.first_name ?? undefined,
    lastName: user?.last_name ?? undefined,
    preferredCountry: userConfig?.preferredCountry ?? undefined,
    preferredCurrency: userConfig?.preferredCurrency ?? undefined
  }

  const form = useForm({
    resolver: zodResolver(UserSettingsSchema),
    mode: 'onTouched',
    values
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = form

  const onSubmit: SubmitHandler<UserSettingsFields> = async data => {
    console.log('submitting', data)
    setIsLoading(true)
    try {
      const response = await updateUserProfile({ formValues: data })
      console.log('response', response)

      if (response.error) {
        return toast.error(
          'Error while updating User Profile',
          response.error.message
        )
      }

      toast.success('Your information was successfully updated.')
    } catch (error: any) {
      console.error('Error while updating User Profile', error?.message)
      toast.error('There was an error while trying to save the user profile.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {settingsPageFields.map((formField, index) => {
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
          return (
            <FormField
              control={control}
              name={key}
              render={({ field }) => {
                const value =
                  typeof field.value === 'boolean' ? '' : field.value
                const errorMessage = errors?.[key]?.message as
                  | string
                  | undefined
                return (
                  <FormItem>
                    <FormControl>
                      <DynamicFormFieldInput<UserSettingsFields>
                        errors={errors}
                        control={control}
                        formField={formField}
                        field={field}
                        watch={watch}
                      />
                    </FormControl>
                    <FormDescription>{formDescription}</FormDescription>
                    <FormMessage>{errorMessage}</FormMessage>
                  </FormItem>
                )
              }}
            />
          )
        })}
        <Button disabled={isLoading} type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
