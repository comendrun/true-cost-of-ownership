'use server'
import RegistrationPageForm from "@/features/auth/components/register-page-form"
import { signup } from "@/features/auth/server/actions/auth.server.actions"

export default async function RegisterPage() {
  return <RegistrationPageForm signup={signup} />
}
