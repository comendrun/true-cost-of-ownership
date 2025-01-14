'use client'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { routes } from './consts'

export default function Breadcrumbs() {
  //   const router = useRouter()
  const pathname = usePathname()
  console.log('pathname', pathname)

  const breadCrumbItems = pathname
    .split('')
    .slice(1)
    .join('')
    .split('/') // removing the first slash in the pathname
    .map(item => routes()?.[item])

  console.log('bread items', breadCrumbItems)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem className='hidden md:block'>
          <BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='hidden md:block' /> */}
        {breadCrumbItems.slice(0, breadCrumbItems.length - 1).map(item => (
          <>
            <BreadcrumbItem key={item.title} className='hidden md:block'>
              <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadCrumbItems.at(-1)?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
