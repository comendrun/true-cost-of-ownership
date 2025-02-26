import { UserProfile } from '@/components/types/add-car/types'
import { LOCAL_STORAGE_KEYS } from '@/consts/app-constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type State = {
  user: UserProfile | null
}

export type Actions = {
  setUser: (values: UserProfile) => void
  clearStorage: () => void
}

export const useUserStore = create<State & Actions>()(
  persist(
    set => ({
      user: null,
      setUser: (values: UserProfile) => {
        console.log('user is being set')

        set(() => ({ user: values }))
      },
      clearStorage: () =>
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY)
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY,
      partialize: state => {
        user: state?.user
      }
    }
  )
)
