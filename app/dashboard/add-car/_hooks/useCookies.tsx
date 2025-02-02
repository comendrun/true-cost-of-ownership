'use client'
import React, { useEffect, useState } from 'react'
import { getCookies, getCookie, deleteCookie } from '../_functions/save-car-server-functions'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export default function useCookie(cookieKey: string) {
  const [cookies, setCookies] = useState<RequestCookie[] | null>(null)
  const [cookie, setCookie] = useState<RequestCookie | undefined>(undefined)

  const deleteCookieWithKey = async () => {
    await deleteCookie(cookieKey)
    setCookie(undefined)
    const updatedCookies = await getCookies()
    setCookies(updatedCookies)
  }

  useEffect(() => {
    const getCookieFunction = async () => {
      if (cookieKey) {
        const cookieValue = await getCookie(cookieKey)
        setCookie(cookieValue)

        const cookies = await getCookies()
        setCookies(cookies)
      }
    }

    getCookieFunction()
  }, [cookieKey])

  return { deleteCookieWithKey, cookies, cookie }
}
