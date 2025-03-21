'use client'
import DynamicFormFieldInput from '@/components/input-fields/dynamic-form-fields'
import {
  UserConfig,
  UserSettingsFields,
  UserSettingsSchema
} from '@/features/settings/types/types'
import { Form, FormLabel } from '@/components/ui/form'
import { settingsPageFields } from '@/consts/settings'
import { useUserStore } from '@/hooks/users.store'
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
import axios from 'axios'
import { UserProfileResponseData } from '@/app/dashboard/settings/api/route'

export default function UserSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

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
      // const response = await updateUserProfile({ formValues: data })
      const response: UserProfileResponseData = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/dashboard/settings/api`,
        data
      )
      console.log('response', response)

      if (response?.error) {
        return toast.error(
          `Error while updating User Profile: ${response.error}`
        )
      }

      toast.success('Your information was successfully updated.')
      if (response?.user) {
        setUser(response?.user)
      }
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
              key={`user-settings-${index}-${formField.key}`}
              control={control}
              name={key}
              render={({ field }) => {
                const value =
                  typeof field.value === 'boolean' ? '' : field.value
                const errorMessage = errors?.[key]?.message as
                  | string
                  | undefined
                return (
                  <FormItem className='grid grid-cols-4 items-center'>
                    {/* <div className='grid grid-cols-4 items-center gap-4'> */}

                    <FormLabel
                      className={`${required && !disabled ? 'required-field' : ''} col-span-2`}
                    >
                      {label}
                    </FormLabel>
                    <FormControl className=''>
                      <div className='col-span-2'>
                        <DynamicFormFieldInput<UserSettingsFields>
                          errors={errors}
                          control={control}
                          formField={formField}
                          field={field}
                          watch={watch}
                        />
                      </div>
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
