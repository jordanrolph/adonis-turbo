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
            <form action={route('auth.registration.store')} method="post">
                {csrfField()}

                {errorsBag?.E_INVALID_CREDENTIALS ?? (
                    <p safe>{JSON.stringify(errorsBag?.E_INVALID_CREDENTIALS)}</p>
                )}

                <div>
                    <label for="fullName">Full Name</label>
                    <input type="text" name="fullName" id="fullName" value={oldValues?.fullName ?? ''} />
                    {errors?.fullName ?? <p>{errors?.fullName}</p>}
                </div>

                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" value={oldValues?.email ?? ''} />
                    {errors?.email ?? <p>{errors?.email}</p>}
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                    {errors?.password ?? <p>{errors?.password}</p>}
                </div>
                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>

            <a href={route('auth.login.show')}>Log in to an existing account</a>
        </>
    )
}
