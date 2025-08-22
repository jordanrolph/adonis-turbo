import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'

interface SignupProps { }

export function Signup({ }: SignupProps) {
    return (
        <>
            {/* @flashMessage('errorsBag')
      @each(error in $message)
        <p>
          {{ error }}
        </p>
      @end
    @end */}

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
