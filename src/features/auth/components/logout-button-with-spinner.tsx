'use client'
import { logUserOut } from '@/features/auth/server/actions/log-user-out.server.action'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import CircularSpinner from '@/components/ui/loading/spinner'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export function LogoutButtonWithDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild className='border-0 bg-transparent outline-0'>
        <DropdownMenuItem
          className='flex flex-row gap-2'
          onClick={async () => {
            setIsOpen(true)
            await logUserOut()
            setIsOpen(false)
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
        {/* <Button variant='outline'>
        </Button> */}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Logging out...</DialogTitle>
          <DialogDescription>
            Please wait until the Log Out process is done.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <CircularSpinner color='bg-seconday' size={50} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
