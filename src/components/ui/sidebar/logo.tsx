import Link from 'next/link'
import React from 'react'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../sidebar'

export default function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href='/dashboard' className=''>
          <SidebarMenuButton
            className='flex w-full gap-4 p-4 py-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            size='lg'
          >
            <div className='flex aspect-square size-12 items-center justify-center rounded-lg text-sidebar-primary-foreground border-2 border-white'>
              <img
                src='/assets/Logo-idea-cropped.png'
                className='w-full rounded-full border-black bg-white dark:border-white dark:bg-white'
                alt='logo'
              />
              {/* <div className='size-4'>§</div> */}
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>AutoMon</span>
              <span className='truncate text-xs'>User Dashboard</span>
            </div>
            {/* <CaretSortIcon className='ml-auto' /> */}
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
