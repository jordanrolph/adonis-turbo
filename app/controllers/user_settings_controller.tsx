import type { HttpContext } from '@adonisjs/core/http'
import { getFlashMessages } from '#controller_helpers/get_flash_messages'
import { DefaultLayout } from '#layouts/default_layout'
import { Settings } from '#views/pages/settings'
import { updateUserDetailsValidator } from '#validators/user_settings'


export default class UserSettingsController {
    async show({ auth, session }: HttpContext) {

        const user = auth.getUserOrFail()
        const flashMessages = getFlashMessages(session)

        return (
            <DefaultLayout pageTitle="Settings" >
                <Settings user={user} flashMessages={flashMessages} />
            </DefaultLayout>
        )
    }

    async store({ auth, request, response, session }: HttpContext) {
        // 1. Get the current user
        const user = auth.getUserOrFail()

        // 2. Validate the form submission
        const payload = await request.validateUsing(updateUserDetailsValidator)

        // 3. Save the new name, if different
        if (user.fullName !== payload.fullName) {
            user.fullName = payload.fullName
            await user.save()
            session.flash('success', "Changes saved")
        }

        // 4. Return the user to the updated page
        return response.redirect().toRoute('user_settings.show')
    }
}