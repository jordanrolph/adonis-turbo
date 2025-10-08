import type { HttpContext } from '@adonisjs/core/http'
import { Home } from '#views/pages/home'
import { DefaultLayout } from '#layouts/default_layout'
import { route } from '#helpers/route_helper'
import { csrfField } from '#helpers/csrf_field_helper'

export default class HomeController {
    async show({ auth }: HttpContext) {
        const user = auth.getUserOrFail()

        return (
            <DefaultLayout pageTitle="Home">
                <Home user={user} />
            </DefaultLayout>
        )
    }

    async hotwireExample({ request, response }: HttpContext) {
        if (request.isTurbo()) {

            return response.turboFrame(
                <turbo-frame id="hotwire-example">
                    <p>Hello from turbo {Date.now()}</p>
                    <a href={route('home.hotwire-example')}>
                        Get Hotwire Turbo response
                    </a>
                </turbo-frame>
            )
        }

        return response.redirect(route("home.show"))
    }
}
