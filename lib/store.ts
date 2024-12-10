import { carFormDefaultValues } from '@/data/consts'
import { CarFormValues } from '@/app/dashboard/add-car/_components/_types/types'
import { create } from 'zustand'

export type State = {
  carFormValues: CarFormValues
}

export type Actions = {
  updateState: (values: CarFormValues) => void
  setCarFormFieldValue: (field: string, value: string | number) => void
}

export const useCarFormStore = create<State & Actions>()(set => ({
  carFormValues: carFormDefaultValues,
  updateState: (values: CarFormValues) =>
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
