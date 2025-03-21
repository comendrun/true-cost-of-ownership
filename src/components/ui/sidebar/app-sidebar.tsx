'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/ui/sidebar/nav-main'
import { NavRecentCars } from '@/components/ui/sidebar/nav-recent-cars'
import { NavUser } from '@/components/ui/sidebar/nav-user'
import { ModeToggle } from '../providers/theme-toggle'
import { navItems } from './sidebar.consts'
import Logo from './logo'
import { UserCarsTableRow, UserProfile } from '@/types/db.types'

export function AppSidebar({
  user,
  cars,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: UserProfile | null
  cars: UserCarsTableRow[] | null
}) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain cars={cars} />
        <NavRecentCars cars={navItems(cars).cars.mainItems || null} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser
          user={{ name: user?.username, email: user?.email || '', avatar: '' }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
