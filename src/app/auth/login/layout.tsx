import { ReactNode } from 'react'

import { TabsContent } from '@radix-ui/react-tabs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function LoginPageLayout({ children }: { children: ReactNode }) {
  return (
    <TabsContent value='login' className='my-2'>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please Login to CTCO using your account information.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex h-full min-h-56 w-full items-start justify-center space-y-2'>
          {children}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
