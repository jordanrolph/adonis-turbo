import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Login } from '#views/login'
import { DefaultLayout } from '#layouts/default_layout'
import { loginValidator } from '#validators/session'
import { getFlashMessages } from '#controller_helpers/get_flash_messages'

export default class SessionController {
    async show({ session }: HttpContext) {
        const flashMessages = getFlashMessages(session)
        return (
            <DefaultLayout pageTitle="Login">
                <Login flashMessages={flashMessages} />
            </DefaultLayout>
        )
    }

    async store({ auth, request, response }: HttpContext) {
        // 1. Validate the form submission
        const payload = await request.validateUsing(loginValidator)
        const { email, password } = payload;

        // 2. Verify credentials using the AuthFinder mixin method
        // In case of invalid credentials, the `verifyCredentials` method will
        // automatically throw E_INVALID_CREDENTIALS exception.
        // Docs: https://docs.adonisjs.com/guides/authentication/verifying-user-credentials#verifying-credentials
        const user = await User.verifyCredentials(email, password)

        // 3. Finally, log in the user and redirect them to the homepage
        await auth.use('web').login(user)
        return response.redirect().toRoute('home.show')
    }

    async destroy({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.redirect().toRoute('auth.login.show')
    }
}
