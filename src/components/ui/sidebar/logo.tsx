import Link from 'next/link'
import React from 'react'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../sidebar'

export default function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href='/dashboard' className=''>
          <SidebarMenuButton
            className='flex gap-4 p-4 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            size='lg'
          >
            <div className='rounded-lgtext-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center'>
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
