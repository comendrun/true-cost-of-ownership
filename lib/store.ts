import { CarFormFields } from '@/app/dashboard/add-car/_types/types'
import { carFormDefaultValues } from '@/data/consts'
import { create } from 'zustand'

export type State = {
  carFormValues: CarFormFields
}

export type Actions = {
  updateState: (values: CarFormFields) => void
  setCarFormFieldValue: (field: string, value: string | number) => void
}

export const useCarFormStore = create<State & Actions>()(set => ({
  carFormValues: carFormDefaultValues,
  updateState: (values: CarFormFields) =>
    set(() => ({
      carFormValues: values
    })),
  setCarFormFieldValue: (field: string, value: string | number) => {
    return set(prevValues => {
      console.log('prevValues', prevValues)
      return {
        ...prevValues,
        carFormValues: {
          ...prevValues.carFormValues,
          [field]: value
        }
      }
    })
  }
}))
