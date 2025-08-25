import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'

interface LogoutButtonProps { }

export function LogoutButton({ }: LogoutButtonProps) {
    return (
        <form action={route('auth.logout')} method="post">
            {csrfField()}
            <button type="submit">Logout</button>
        </form>
    )
}