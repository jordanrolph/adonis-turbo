import type { AuthenticatedUser } from '#types/auth'
import { LogoutButton } from '#components/logout_button'
import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'

interface HomeProps {
  user: AuthenticatedUser
}

export function Home({ user }: HomeProps) {
  return (
    <>
      <h1>Hello {user.fullName}</h1>
      <p>You are logged in as {user.email}</p>

      <turbo-frame>
        <p id="hotwire-example">Hello from static Kita template</p>
        <form action={route('home.hotwire-example')} method="post">
          {csrfField()}
          <button type="submit">Get Hotwire Turbo response</button>
        </form>
      </turbo-frame>

      <LogoutButton />
    </>
  )
}
