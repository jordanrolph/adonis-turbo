import type { AuthenticatedUser } from '#types/auth'
import { LogoutButton } from '#components/logout_button'
import { route } from '#helpers/route_helper'

interface HomeProps {
  user: AuthenticatedUser
}

export function Home({ user }: HomeProps) {
  return (
    <>
      <h1 safe>Hello {user.fullName}</h1>
      <p safe>You are logged in as {user.email}</p>
      <a href={route('user_settings.show')}>
        Settings
      </a>


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
