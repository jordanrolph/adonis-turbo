import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'
import { FlashMessages } from '#types/session'

interface SignupProps {
    flashMessages: FlashMessages
}

export function Signup({ flashMessages }: SignupProps) {
    const { errorsBag } = flashMessages
    return (
        <>
            <p>{errorsBag?.E_INVALID_CREDENTIALS || ''}</p>

            <form action={route('auth.registration.store')} method="post">
                {csrfField()}
                <div>
                    <label for="fullName">Full Name </label>
                    <input type="text" name="fullName" id="fullName" />
                </div>

                <div>
                    <label for="email">Email </label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label for="password">Password </label>
                    <input type="password" name="password" id="password" />
                </div>

                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>

            <a href={route('auth.login.show')}>Log in to an existing account</a>
        </>
    )
}
