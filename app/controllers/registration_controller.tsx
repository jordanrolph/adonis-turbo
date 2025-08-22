import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { Signup } from '#views/signup'

export default class RegistrationController {
  async show({ }: HttpContext) {
    return <Signup />
  }

  async store({ auth, request, response }: HttpContext) {
    // 1. Validate the form submission
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    if (!email || !password || !fullName) {
      throw new errors.E_INVALID_CREDENTIALS('Missing some details')
    }

    // 2. Hash the password ready to store it
    const hashedPassword = await hash.make(password)

    // 3. Create the user in the db. Throw an error if a user with this email already exists
    let newUser: User
    try {
      newUser = await User.create({ email, fullName, password: hashedPassword })

    } catch (error) {
      throw new errors.E_INVALID_CREDENTIALS('Error creating account')
    }

    // 4. Finally, log in the user and redirect them to the homepage
    await auth.use('web').login(newUser)
    return response.redirect('/')
  }
}
