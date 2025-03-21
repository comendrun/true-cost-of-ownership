'use server'
import { signup } from '../../../features/auth/server/actions/auth.server.actions'
import RegistrationPageForm from '../../../features/auth/components/register-page-form'

export default async function RegisterPage() {
  return <RegistrationPageForm signup={signup} />
}
