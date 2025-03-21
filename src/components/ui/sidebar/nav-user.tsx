'use client'

import { logUserOut } from '@/features/auth/server/actions/log-user-out.server.action'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

export function NavUser({
  user
}: {
  user: {
    name: string | null | undefined
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const avatarUrl =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp'

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
                <AvatarImage
                  src={avatarUrl}
                  alt={user?.name || 'User Avatar'}
                  className=''
                />
                <AvatarFallback className='rounded-lg'>
                  {user.email.split('').splice(0, 2).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
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
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={'avatarUrl'}
                    alt={user?.name || 'User Avatar'}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {' '}
                    {user.email.split('').splice(0, 2).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.name}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className='flex flex-row gap-2'>
                <Link href='/dashboard/settings'>
                  <User />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='flex flex-row gap-2'
              onClick={async () => {
                logUserOut()
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <LogoutButtonWithDialog />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
