import { HttpContext } from '@adonisjs/core/http'

/**
 * This view helper will generate a hidden input with the CSRF token for use inside a form.
 *
 * Usage example:
 * ```
 *  import { csrfField } from '#view_helpers/csrf_field_helper'
 *  // ...then, in component
 *  <form>
 *      {csrfField()}
 *      // ... add any other form elements you need like normal
 *  </form>
 * ```
 *
 * Renders:
 * `<form><input type="hidden" value="some random token" name="_csrf"></form>`
 */
export function csrfField() {
    const { request } = HttpContext.getOrFail()

    return <input type="hidden" value = { request.csrfToken } name = "_csrf" />
}
