import type { HttpContext } from '@adonisjs/core/http'
import { Home } from '#views/home'
import { DefaultLayout } from '#layouts/default_layout'
import { route } from '#helpers/route_helper'

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
            return response.turbo(
                <turbo-stream action="replace" target="hotwire-example">
                    <template>
                        <p id="hotwire-example">
                            Hello from Turbo {Date.now()}
                        </p>
                    </template>
                </turbo-stream>
            )
        }

        return response.redirect(route("home.show"))
    }
}
