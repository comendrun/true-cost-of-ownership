import { logUserOut } from '@/app/actions'
import { Button } from '../ui/button'

export default function LogoutButton() {
  return (
    <Button onClick={() => logUserOut()} variant='secondary'>
      Logout
    </Button>
  )
}
