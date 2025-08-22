// This helper will generate a hidden input with the CSRF token for use in view templates.

import { HttpContext } from '@adonisjs/core/http'

export function csrfField() {
    // Note the usage of ALS here.
    const { request } = HttpContext.getOrFail()

    return Html.createElement('input', { type: 'hidden', value: request.csrfToken, name: '_csrf' })
}
