'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'
import { routes } from './sidebar.consts'

export default function Breadcrumbs({
  car
}: {
  car?: { id: number; name: string } | null
}) {
  const pathname = usePathname()

  const pathnameSplit = pathname.split('/').filter(Boolean)
  const id = pathnameSplit.filter(path => Number(path)).filter(Boolean)?.[0]

  const breadCrumbItems = pathnameSplit // Remove empty strings
    .map(item => routes({ id: Number(id) })?.[item])

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
