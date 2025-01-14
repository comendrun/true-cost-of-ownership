'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from 'lucide-react'

import { NavMain } from '@/components/ui/sidebar/nav-main'
import { NavProjects } from '@/components/ui/sidebar/nav-projects'
import { NavUser } from '@/components/ui/sidebar/nav-user'
import { TeamSwitcher } from '@/components/ui/sidebar/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { CaretSortIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import Logo from './logo'
import { User } from '@supabase/supabase-js'
import { navItems } from './consts'
import { UserCarsTableRow } from '@/app/dashboard/add-car/_types/types'

// the page

// This is sample data.
// const data = {
//   user: {
//     name: 'shadcn',
//     email: 'm@example.com',
//     avatar: '/avatars/shadcn.jpg'
//   },
//   teams: [
//     {
//       name: 'Acme Inc',
//       logo: GalleryVerticalEnd,
//       plan: 'Enterprise'
//     },
//     {
//       name: 'Acme Corp.',
//       logo: AudioWaveform,
//       plan: 'Startup'
//     },
//     {
//       name: 'Evil Corp.',
//       logo: Command,
//       plan: 'Free'
//     }
//   ],
//   navMain: [
//     {
//       title: 'Playground',
//       url: '#',
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: 'History',
//           url: '#'
//         },
//         {
//           title: 'Starred',
//           url: '#'
//         },
//         {
//           title: 'Settings',
//           url: '#'
//         }
//       ]
//     },
//     {
//       title: 'Models',
//       url: '#',
//       icon: Bot,
//       items: [
//         {
//           title: 'Genesis',
//           url: '#'
//         },
//         {
//           title: 'Explorer',
//           url: '#'
//         },
//         {
//           title: 'Quantum',
//           url: '#'
//         }
//       ]
//     },
//     {
//       title: 'Documentation',
//       url: '#',
//       icon: BookOpen,
//       items: [
//         {
//           title: 'Introduction',
//           url: '#'
//         },
//         {
//           title: 'Get Started',
//           url: '#'
//         },
//         {
//           title: 'Tutorials',
//           url: '#'
//         },
//         {
//           title: 'Changelog',
//           url: '#'
//         }
//       ]
//     },
//     {
//       title: 'Settings',
//       url: '#',
//       icon: Settings2,
//       items: [
//         {
//           title: 'General',
//           url: '#'
//         },
//         {
//           title: 'Team',
//           url: '#'
//         },
//         {
//           title: 'Billing',
//           url: '#'
//         },
//         {
//           title: 'Limits',
//           url: '#'
//         }
//       ]
//     }
//   ],
//   projects: [
//     {
//       name: 'Design Engineering',
//       url: '#',
//       icon: Frame
//     },
//     {
//       name: 'Sales & Marketing',
//       url: '#',
//       icon: PieChart
//     },
//     {
//       name: 'Travel',
//       url: '#',
//       icon: Map
//     }
//   ]
// }

export function AppSidebar({
  user,
  cars,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: User | null
  cars: UserCarsTableRow[] | null
}) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          sectionTitle={navItems(cars).navMain.title}
          items={navItems(cars).navMain.mainItems}
        />
        <NavProjects projects={navItems(cars).cars.mainItems || null} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: 'User', email: user?.email || '', avatar: '' }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
