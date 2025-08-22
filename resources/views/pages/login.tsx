import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'

interface LoginProps { }

export function Login({ }: LoginProps) {
    return (
        <>
            {/* @flashMessage('errorsBag')
      @each(error in $message)
        <p>
          {{ error }}
        </p>
      @end
    @end */}

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
