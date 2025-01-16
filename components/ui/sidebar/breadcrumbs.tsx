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
import { usePathname } from 'next/navigation'
import { routes } from './consts'

export default function Breadcrumbs() {
  const pathname = usePathname()
  console.log('pathname', pathname)

  const breadCrumbItems = pathname
    .split('/')
    .filter(Boolean) // Remove empty strings
    .map(item => routes()?.[item])

  console.log('bread items', breadCrumbItems)
  const currentPage = breadCrumbItems.at(-1)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbItems
          .slice(0, breadCrumbItems.length - 1)
          .map((item, index) => (
            <React.Fragment key={`breadcrumb-${index}`}>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
            </React.Fragment>
          ))}
        <BreadcrumbItem key={`breadcrumb-current`}>
          <BreadcrumbPage>{currentPage?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
