import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SimpleFormFields } from '../types/add-car.simple.types'

type SimpleFormState = {
  data: Partial<SimpleFormFields>
}

type SimpleFormAction = {
  setData: (data: Partial<SimpleFormFields>) => void
  clearData: () => void // Method to manually clear the storage
}

export const useSimpleFormDataStore = create<
  SimpleFormState & SimpleFormAction
>()(
  persist(
    set => ({
      data: {},
      setData: data =>
        set(prevValues => ({
          data: {
            ...prevValues.data,
            ...data
          }
        })),
      clearData: () => set({ data: {} }) // Clear the in-memory state
    }),
    {
      name: 'simple-form-data',
      storage: createJSONStorage(() => sessionStorage), // Use session storage
      partialize: state => ({
        data: state.data
      })
    }
  )
)
