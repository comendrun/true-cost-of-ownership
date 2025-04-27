'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { ReactNode } from 'react'

export default function RegisterPageLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <TabsContent value='register' className='max-w-96'>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            You don&apos;t have an account? Create your new account now to save
            the researched Cars.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex h-full min-h-56 w-full items-start justify-center space-y-2'>
          {children}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
