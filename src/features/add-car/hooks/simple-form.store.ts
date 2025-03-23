import { create } from 'zustand'
import {
  SimpleFormDriverInfo,
  SimpleFormFields
} from '../types/add-car.simple.types'

type SimpleFormState = {
  data: Partial<SimpleFormFields>
}

type SimpleFormAction = {
  setData: (data: Partial<SimpleFormFields>) => void
}

export const useSimpleFormDataStore = create<
  SimpleFormState & SimpleFormAction
>(set => ({
  data: {},
  setData: data =>
    set(prevValues => ({
      data: {
        ...prevValues.data,
        ...data
      }
    }))
}))
