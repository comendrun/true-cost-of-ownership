import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SimpleFormFields } from '../types/add-car.simple.types'

type SimpleFormState = {
  data: Partial<SimpleFormFields>
}

type SimpleFormAction = {
  setData: (data: Partial<SimpleFormFields>) => void
}

export const useSimpleFormDataStore = create<
  SimpleFormState & SimpleFormAction
>(
  persist(
    set => ({
      data: {},
      setData: data =>
        set(prevValues => ({
          data: {
            ...prevValues.data,
            ...data
          }
        }))
    }),
    {
      name: 'simple-form-data',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
