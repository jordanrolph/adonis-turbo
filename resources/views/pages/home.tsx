import type { AuthenticatedUser } from '#types/auth'
import { LogoutButton } from '#components/logout_button'

interface HomeProps {
  user: AuthenticatedUser
}

export function Home({ user }: HomeProps) {
  return (
    <>
      <h1>Hello {user.fullName}</h1>
      <p>You are logged in as {user.email}</p>
      <LogoutButton />
    </>
  )
}
