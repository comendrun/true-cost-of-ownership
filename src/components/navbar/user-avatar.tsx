import { Avatar, AvatarLetters } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { logUserOut } from '@/server/actions/log-user-out.server.action'
import Link from 'next/link'

export default function UserNavAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarLetters letters='KR' />
          {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
          {/* <AvatarFallback>User</AvatarFallback> */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem className='flex md:hidden'>
          <Link className='' href='/my-cars'>
            My Cars
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex md:hidden'>
          <Link className='' href='/add-car'>
            Add a New Car
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => logUserOut()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
