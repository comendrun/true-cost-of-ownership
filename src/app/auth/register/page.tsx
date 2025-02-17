'use server'
import { signup } from '../actions'
import RegistrationPageForm from './_component/register-page-form'

export default async function RegisterPage() {
  return <RegistrationPageForm signup={signup} />
}
