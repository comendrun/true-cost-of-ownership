'use client'
import { useUserStore } from '@/lib/users.store'
import React from 'react'

export default function UserSettings() {
  const user = useUserStore(state => state.user)
  console.log('user', user)
  
  return <div></div>
}
