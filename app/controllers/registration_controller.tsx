import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@adonisjs/auth'
import User from '#models/user'
import { Signup } from '#views/signup'
import type { FlashMessages } from '#types/session'
import { DefaultLayout } from '#layouts/default_layout'
import { signUpValidator } from '#validators/registration'

export default class RegistrationController {
  async show({ session }: HttpContext) {
    const flashMessages: FlashMessages = session.flashMessages.all()
    return (
      <DefaultLayout pageTitle="Sign up">
        <Signup flashMessages={flashMessages} />
      </DefaultLayout>
    )
  }

  async store({ auth, request, response }: HttpContext) {
    // 1. Validate the form submission
    const payload = await request.validateUsing(signUpValidator)
    const { email, password, fullName } = payload;

    // 2. Create the user in the db. The withAuthFinder mixin will automatically hash the password
    let newUser: User
    try {
      newUser = await User.create({ email, fullName, password })
    } catch (error) {
      throw new errors.E_INVALID_CREDENTIALS('Error creating account')
    }

    // 4. Finally, log in the user and redirect them to the homepage
    await auth.use('web').login(newUser)
    return response.redirect('/')
  }
}
