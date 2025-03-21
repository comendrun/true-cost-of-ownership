import { logUserOut } from '@/server/actions/log-user-out.server.action'
import { Button } from '../ui/button'

export default function LogoutButton() {
  return (
    <Button onClick={() => logUserOut()} variant='secondary'>
      Logout
    </Button>
  )
}
