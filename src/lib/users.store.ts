import { UserProfile } from '@/components/types/add-car/types'
import { LOCAL_STORAGE_KEYS } from '@/consts/app-constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type State = {
  user: UserProfile | null
}

export type Actions = {
  setUser: (values: UserProfile | null) => void
  clearStorage: () => void
}

const localStoredUser = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY) || '{}'
)?.state as State

export const useUserStore = create<State & Actions>()(
  persist(
    set => ({
      user: localStoredUser?.user || null,
      setUser: (values: UserProfile | null) => set(() => ({ user: values })),
      clearStorage: () =>
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY)
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY,
      partialize: state => ({
        user: state?.user
      })
    }
  )
)
