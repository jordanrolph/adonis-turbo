import { route } from '#helpers/route_helper'
import { csrfField } from '#helpers/csrf_field_helper'
// import { inspect } from '#helpers/inspect_helper'
import { FlashMessages } from '#types/session'

interface LoginProps {
    flashMessages: FlashMessages
}

export function Login({ flashMessages }: LoginProps) {
    const { errors, oldValues, errorsBag } = flashMessages

    return (
        <>
            {errorsBag?.E_INVALID_CREDENTIALS ? (
                <p safe>{errorsBag?.E_INVALID_CREDENTIALS}</p>
            ) : null}

            <form action={route('auth.login.store')} method="post">
                {csrfField()}
                <div>
                    <label for="email">Email</label>
                    <input safe type="email" name="email" id="email" value={oldValues?.email ?? ''} />
                    {errors?.email ? <p safe>{errors.email}</p> : null}
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                    {errors?.password ? <p safe>{errors.password}</p> : null}
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>

            <a href={route('auth.registration.show')}>Create a new account</a>
        </>
    )
}
