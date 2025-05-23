'use client'

import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../button'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                {/* <AvatarImage src={'avatarUrl'} alt={'Theme Mode'} /> */}
                <AvatarFallback className='rounded-lg'>
                  <Button variant='ghost' size='icon' className='bg-transparent'>
                    <Sun className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                  </Button>
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Theme</span>
                {/* <span className='truncate text-xs'>{user.email}</span> */}
              </div>
              <CaretSortIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <p>Select a Theme</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setTheme('light')}
                className='flex flex-row gap-2'
              >
                <p>Light</p>
                {/* <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' /> */}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('dark')}
                className='flex flex-row gap-2'
              >
                <p>Dark</p>
                {/* <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' /> */}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('system')}
                className='flex flex-row gap-2'
              >
                <p>System</p>
                {/* <MonitorCog /> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
