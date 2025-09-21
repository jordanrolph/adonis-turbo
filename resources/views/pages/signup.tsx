import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'
import type { FlashMessages } from '#types/session'

interface SignupProps {
    flashMessages: FlashMessages
}

export function Signup({ flashMessages }: SignupProps) {
    const { errors, oldValues, errorsBag } = flashMessages

    return (
        <>
            {errorsBag?.E_INVALID_CREDENTIALS ? (
                <p safe>{errorsBag?.E_INVALID_CREDENTIALS}</p>
            ) : null}

            <form action={route('auth.registration.store')} method="post">
                {csrfField()}

                <div>
                    <label for="fullName">Full Name</label>
                    <input type="text" name="fullName" id="fullName" value={oldValues?.fullName ?? ''} />
                    {errors?.fullName ? <p safe>{errors?.fullName}</p> : null}
                </div>

                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" value={oldValues?.email ?? ''} />
                    {errors?.email ? <p safe>{errors?.email}</p> : null}
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                    {errors?.password ? <p safe>{errors?.password}</p> : null}
                </div>
                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>

            <a href={route('auth.login.show')}>Log in to an existing account</a>
        </>
    )
}
