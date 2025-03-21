'use client'

import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { navItems } from './sidebar.consts'

export function NavRecentCars({
  cars
}: {
  cars:
    | {
        name: string
        url: string
        brand: string
        model: string
        year: number
        icon?: LucideIcon | string
      }[]
    | null
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>{navItems().cars.title}</SidebarGroupLabel>
      <SidebarMenu>
        {cars?.map((item, index) => (
          <SidebarMenuItem key={`item-${item.name}-${index}-${item.url}`}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                {/* <item.icon /> */}
                <span>
                  {item.name || `${item.brand}-${item.model}-${item.year}`}
                </span>
              </a>
            </SidebarMenuButton>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <DotsHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className='text-sidebar-foreground/70'>
            <DotsHorizontalIcon className='text-sidebar-foreground/70' />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
