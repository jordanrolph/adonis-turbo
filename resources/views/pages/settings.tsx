import { csrfField } from '#helpers/csrf_field_helper'
import { route } from '#helpers/route_helper'
import User from '#models/user'
import type { FlashMessages } from '#types/session'

interface SettingsProps {
    flashMessages: FlashMessages
    user: User
}

export function Settings({ flashMessages, user }: SettingsProps) {
    const { errors, oldValues, success, errorsBag } = flashMessages

    return (
        <>
            <h1>Settings</h1>
            <a href={route("home.show")}>Home</a>

            <div>
                <label for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email || ""}
                    placeholder='Your email'
                    disabled
                />
                <label>Your email can't be changed</label>
            </div>

            <form action={route('user_settings.store')} method="post">
                {csrfField()}

                <div>
                    <label for="fullName">Full Name</label>
                    <input
                        name="fullName"
                        id="fullName"
                        value={user.fullName || oldValues?.fullName || ""}
                        placeholder='Your full name'
                    />
                    {errors?.fullName ? <p safe>{errors?.fullName}</p> : null}
                </div>

                <button type="submit">Save changes</button>
            </form>


            {success ? (
                <p
                    safe
                    x-data="{ show: true }"
                    x-show="show"
                    x-init="setTimeout(() => show = false, 1500)"
                >
                    {success}
                </p>
            ) : null}

            {errorsBag?.E_WEB_EXCEPTION ? (
                <p safe>{errorsBag?.E_WEB_EXCEPTION}</p>
            ) : null}
        </>
    )
}
