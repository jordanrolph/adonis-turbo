import type { HttpContext } from '@adonisjs/core/http'
import { Home } from '#views/home'
import { DefaultLayout } from '#layouts/default_layout'

export default class HomeController {
    handle({ auth }: HttpContext) {
        const user = auth.getUserOrFail()

        return (
            <DefaultLayout pageTitle="Home">
                <Home user={user} />
            </DefaultLayout>
        )
    }
}
