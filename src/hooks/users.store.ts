'use client'
import { LOCAL_STORAGE_KEYS } from '@/data/app.consts'
import { UserProfile } from '@/types/db.types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type State = {
  user: UserProfile | null
}

export type Actions = {
  setUser: (values: UserProfile | null) => void
  clearStorage: () => void
}

export const useUserStore = create<State & Actions>()(
  persist(
    set => ({
      user: null,
      setUser: (values: UserProfile | null) => set(() => ({ user: values })),
      clearStorage: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(
            LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY
          )
        }
      }
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER_INFO_LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {}
            }
      ),
      partialize: state => ({
        user: state?.user
      })
    }
  )
)
