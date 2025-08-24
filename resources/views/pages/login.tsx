import { route } from '#helpers/route_helper'
import { csrfField } from '#helpers/csrf_field_helper'
// import { inspect } from '#helpers/inspect_helper'
import type { FlashMessages } from '#types/session'

interface LoginProps {
    flashMessages: FlashMessages
}

export function Login({ flashMessages }: LoginProps) {
    const { errorsBag } = flashMessages
    const invalidCredentialsMessage = errorsBag?.E_INVALID_CREDENTIALS ?? ''

    return (
        <>
            {/* {inspect(flashMessages)} */}
            {invalidCredentialsMessage ?? <p>{invalidCredentialsMessage}</p>}
            <form action={route('auth.login.store')} method="post">
                {csrfField()}
                <div>
                    <label for="email">Email </label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label for="password">Password </label>
                    <input type="password" name="password" id="password" />
                </div>

                <div>
                    <button type="submit">Login </button>
                </div>
            </form>

            <a href={route('auth.registration.show')}>Create a new account</a>
        </>
    )
}
