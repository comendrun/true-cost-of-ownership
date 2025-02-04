'use server'

import { cookies } from 'next/headers'

const cookieStore = await cookies()

export async function getCookie(cookieKey: string) {
  return await cookieStore.get(cookieKey)
}

export async function deleteCookie(cookieKey: string) {
  console.log('deleting cookie with the key', cookieKey)

  return await cookieStore.delete(cookieKey)
}

export async function getCookies() {
  return await cookieStore.getAll()
}
