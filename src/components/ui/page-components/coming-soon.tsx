/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FhHJTdJDd5T
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link'
import { ErrorPageProps } from '../../../types/error-page.types'

export default function ComingSoon({
  title = 'COMING SOON!',
  description = 'This page is still under constrcution Please take a look at our other pages.',
  bounce = false,
  buttonTitle = 'Take me to Dashboard',
  href = '/dashboard'
}: ErrorPageProps) {
  return (
    <div className='flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
      <div className='w-full space-y-6 text-center'>
        <div className='space-y-3'>
          <h1
            className={`text-4xl font-bold tracking-tighter sm:text-5xl ${bounce && 'animate-bounce'}`}
          >
            {title}
          </h1>
          <p className='text-gray-500'>{description}</p>
        </div>
        <Link
          href={href}
          className='inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
          prefetch={false}
        >
          {buttonTitle}
        </Link>
      </div>
    </div>
  )
}
