import type { HttpContext } from '@adonisjs/core/http'
import { Home } from '#views/home'

export default class HomeController {
    handle({ auth }: HttpContext) {
        const user = auth.getUserOrFail()

        return <Home user={ user } />
    }
}
