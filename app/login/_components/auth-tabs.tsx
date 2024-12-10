import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { login, signup } from '../actions'
import { Schema, z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BaseSyntheticEvent } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthenticationTabs({ control, errors }: any) {
  return (
    <Tabs defaultValue='login' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='login'>Login</TabsTrigger>
        <TabsTrigger value='register'>Register</TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please Login to CTCO using your account information.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField
              control={control}
              name='email'
              render={field => {
                return (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>

                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage>{errors?.email?.message}</FormMessage>
                  </FormItem>
                )
              }}
            />
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value='password'>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='current'>Current password</Label>
              <Input id='current' type='password' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='new'>New password</Label>
              <Input id='new' type='password' />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
