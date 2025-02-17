import Link from 'next/link'
import React from 'react'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../sidebar'

export default function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link
          // size='lg'
          href='/dashboard'
          //   className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex gap-4 p-4'
          className=''
        >
          <SidebarMenuButton
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex gap-4 p-4'
            size='lg'
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
              {/* <activeTeam.logo className='size-4' /> */}
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
