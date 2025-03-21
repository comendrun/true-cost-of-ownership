'use server'

import { cookies } from 'next/headers'

export async function getCookie(cookieKey: string) {
  const cookieStore = await cookies()
  return await cookieStore.get(cookieKey)
}

export async function deleteCookie(cookieKey: string) {
  const cookieStore = await cookies()
  console.log('deleting cookie with the key', cookieKey)

  return await cookieStore.delete(cookieKey)
}

export async function getCookies() {
  const cookieStore = await cookies()
  return await cookieStore.getAll()
}
