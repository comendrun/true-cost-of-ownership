import {
  CarFormFields,
  CarFormOptionalFields,
  CarFormValuesKeys
} from '@/app/dashboard/add-car/_types/types'
import { carFormDefaultValues } from '@/data/consts'
import { create } from 'zustand'

export type State = {
  carFormValues: CarFormFields | null
  optionalCarFormValues: CarFormOptionalFields | null
  isSavingCarInProgress: boolean
}

export type Actions = {
  updateCarFormValues: (values: CarFormFields) => void
  updateOptionalCarFormValues: (values: CarFormOptionalFields) => void
  setCarFormFieldValue: (
    field: CarFormValuesKeys,
    value: string | number
  ) => void
  setIsSavingCarInProgress: (boolValue: boolean) => void
}

export const useCarFormStore = create<State & Actions>()(set => ({
  carFormValues: null,
  optionalCarFormValues: null,
  updateCarFormValues: (values: CarFormFields) =>
    set(() => ({
      carFormValues: values
    })),
  updateOptionalCarFormValues: (values: CarFormOptionalFields) =>
    set(() => ({
      optionalCarFormValues: values
    })),
  setCarFormFieldValue: (field: CarFormValuesKeys, value: string | number) => {
    return set(prevValues => {
      if (!prevValues.carFormValues) {
        return prevValues
      }
      return {
        ...prevValues,
        carFormValues: {
          ...prevValues.carFormValues,
          [field]: value ?? ''
        }
      }
    })
  },
  isSavingCarInProgress: false,
  setIsSavingCarInProgress: (boolValue: boolean) =>
    set(prevValues => ({
      ...prevValues,
      isSavingCarInProgress: boolValue
    }))
}))
