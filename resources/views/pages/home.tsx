import type { AuthenticatedUser } from '#types/auth'
import { LogoutButton } from '#components/logout_button'
import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'
import { inspect } from '#helpers/inspect_helper'

interface HomeProps {
  user: AuthenticatedUser
}

export function Home({ user }: HomeProps) {
  return (
    <>
      <h1>Hello {user.fullName}</h1>
      <p>You are logged in as {user.email}</p>

      <turbo-frame id="hotwire-example">
        <p>Hello from static Kita template</p>
        <a href={route('home.hotwire-example')}>
          Get Hotwire Turbo response
        </a>
      </turbo-frame>

      <a href={route('home.show')}>
        Get server response
      </a>

      <input placeholder='Test'></input>

      <LogoutButton />
    </>
  )
}
