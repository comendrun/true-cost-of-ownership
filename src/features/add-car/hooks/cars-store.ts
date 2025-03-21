import { FORM_VALUES_STORED_KEY } from '@/consts/add-car-consts'
import {
  CarFormFields,
  CarFormOptionalFields,
  CarFormValuesKeys
} from '@/features/add-car/types/add-cars.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type State = {
  carFormValues: CarFormFields | null
  optionalCarFormValues: CarFormOptionalFields | null
  isSavingCarInProgress: boolean
}

export type Actions = {
  updateCarFormValues: (values: CarFormFields | null) => void
  updateOptionalCarFormValues: (values: CarFormOptionalFields | null) => void
  setCarFormFieldValue: (
    field: CarFormValuesKeys,
    value: string | number
  ) => void
  setIsSavingCarInProgress: (boolValue: boolean) => void
  clearStorage: () => void
  clearPartialStorage: (keys: (keyof State)[]) => void
}

export const useCarFormStore = create<State & Actions>()(
  persist(
    set => ({
      carFormValues: null,
      optionalCarFormValues: null,
      isSavingCarInProgress: false,

      updateCarFormValues: (values: CarFormFields | null) =>
        set(() => ({
          carFormValues: values
        })),
      updateOptionalCarFormValues: (values: CarFormOptionalFields | null) =>
        set(() => ({
          optionalCarFormValues: values
        })),
      setCarFormFieldValue: (
        field: CarFormValuesKeys,
        value: string | number
      ) =>
        set(prevValues => {
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
        }),
      setIsSavingCarInProgress: (boolValue: boolean) =>
        set(prevValues => ({
          ...prevValues,
          isSavingCarInProgress: boolValue
        })),
      clearStorage: () => {
        localStorage.removeItem(FORM_VALUES_STORED_KEY) // Key must match the `name` used in persist config
      },
      clearPartialStorage: (keys: (keyof State)[]) => {
        const storedState = JSON.parse(
          localStorage.getItem(FORM_VALUES_STORED_KEY) || '{}'
        )
        keys.forEach(key => {
          delete storedState[key]
        })
        localStorage.setItem(
          FORM_VALUES_STORED_KEY,
          JSON.stringify(storedState)
        )
      }
    }),
    {
      name: FORM_VALUES_STORED_KEY, // Key for localStorage
      partialize: state => ({
        optionalCarFormValues: state.optionalCarFormValues,
        isSavingCarInProgress: state.isSavingCarInProgress,
        carFormValues: state.carFormValues
      }) // Specify what part of the state to persist
    }
  )
)
