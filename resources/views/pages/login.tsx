import { route } from '#helpers/route_helper'
import { csrfField } from '#helpers/csrf_field_helper'
// import { inspect } from '#helpers/inspect_helper'
import { FlashMessages } from '#types/session'

interface LoginProps {
    flashMessages: FlashMessages
}

export function Login({ flashMessages }: LoginProps) {
    const { errors, oldValues } = flashMessages

    return (
        <>
            {/* {inspect(flashMessages)} */}
            <form action={route('auth.login.store')} method="post">
                {csrfField()}
                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" value={oldValues?.email ?? ''} />
                    {errors?.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                    {errors?.password && <p>{errors.password}</p>}
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>

            <a href={route('auth.registration.show')}>Create a new account</a>
        </>
    )
}
