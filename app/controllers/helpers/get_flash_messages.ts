import { HttpContext } from '@adonisjs/core/http'
import { FlashMessages } from '#types/session'

/**
 * Combines all flash message data into a single object for easy use in controllers.
 *
 * Includes general flash messages, validation errors, and old form input values.
 * This prevents having to pass multiple separate props to views.
 *
 * Usage example:
 * ```
 * async show({ session }: HttpContext) {
 *   const flashMessages = getFlashMessages(session)
 *   return <MyView flashMessages={flashMessages} />
 * }
 * ```
 *
 * Returns:
 * ```
 * {
 *   errorsBag: { E_INVALID_CREDENTIALS: "Error message" },
 *   errors: { email: ["Email is required"] },
 *   old: { fullName: "Hello Adonis", email: "user@example.com" }
 * }
 * ```
 */
export function getFlashMessages(session: HttpContext['session']): FlashMessages {
    const allMessages = session.flashMessages.all()
    const { errorsBag, inputErrorsBag, ...oldValues } = allMessages

    return {
        errorsBag,
        errors: session.flashMessages.get('errors') || inputErrorsBag,
        oldValues: Object.keys(oldValues).length > 0 ? oldValues : undefined,
    }
}
