import { ReactNode } from 'react'

export type ErrorPageProps = {
  title: ReactNode | string
  description: ReactNode | string
  bounce?: boolean
  buttonTitle: string
  href: string
}
