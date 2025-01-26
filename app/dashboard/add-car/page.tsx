'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function AddCarPage() {
  return (
    <>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 px-2 py-20 md:min-h-min'>
        <div className='mx-auto mb-10 flex w-full'>
          <p className='mx-auto'>
            How do you want to proceed adding a New Car Analysis?
          </p>
        </div>
        <div className='flex w-full flex-col-reverse items-start justify-center gap-10 lg:flex-row'>
          <Card className='mx-auto lg:mx-0 flex w-full max-w-[500px] flex-col self-stretch'>
            <CardHeader>
              <CardTitle>Simple Form</CardTitle>
              <CardDescription>
                <ul className='list-inside list-disc'>
                  <li>Less fields to be filled</li>
                  <li>Less time consuming</li>
                  <li>Suitable for faster saving and processing time</li>
                  <li>
                    Less accurate Analysis as some of the data might be filled
                    with general information
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent className='ml-auto mt-auto'>
              <Link href='/dashboard/add-car/simple'>
                <Button variant='outline'>Simple Form</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className='mx-auto lg:mx-0 flex w-full max-w-[500px] flex-col self-stretch'>
            <CardHeader>
              <CardTitle>Advanced Form</CardTitle>
              <CardDescription>
                <ul className='list-inside list-disc'>
                  <li>More Fields to fill</li>
                  <li>More Accurate</li>
                  <li>Suitable for better and more accurate analysis</li>
                  <li>Recommended</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent className='ml-auto mt-auto'>
              <Link href='/dashboard/add-car/advanced'>
                <Button>Advanced Form</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
