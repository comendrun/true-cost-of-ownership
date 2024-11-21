import { Button } from '@/components/ui/button'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className='m-auto flex max-w-[600px] flex-col gap-2 p-2'>
      <label className='grid grid-cols-2 gap-2'>
        <span>Email:</span>
        <input id='email' name='email' type='email' required />
      </label>
      <label className='grid grid-cols-2 gap-2'>
        <span>Password:</span>
        <input id='password' name='password' type='password' required />
      </label>
      <div className='flex flex-col gap-2'>
        <Button className='flex w-full px-2 py-4' formAction={login}>
          Log in
        </Button>
        <Button
          variant='secondary'
          className='flex w-full px-2 py-4'
          formAction={signup}
        >
          Sign up
        </Button>
      </div>
    </form>
  )
}
