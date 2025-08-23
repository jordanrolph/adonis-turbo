import { HttpContext } from '@adonisjs/core/http'

// Manually typed: AdonisJS types don't expose the specific structure of flash message data
// This type is used to get better type hinting when displaying errors to the user in a view
type ErrorsBag = {
    // Common AdonisJS error codes (Docs: https://docs.adonisjs.com/guides/references/exceptions)
    E_ROUTE_NOT_FOUND?: string
    E_AUTHORIZATION_FAILURE?: string
    E_TOO_MANY_REQUESTS?: string
    E_ROW_NOT_FOUND?: string
    E_BAD_CSRF_TOKEN?: string
    E_OAUTH_MISSING_CODE?: string
    E_OAUTH_STATE_MISMATCH?: string
    E_UNAUTHORIZED_ACCESS?: string
    E_INVALID_CREDENTIALS?: string
    E_CANNOT_LOOKUP_ROUTE?: string
    E_HTTP_EXCEPTION?: string
    E_HTTP_REQUEST_ABORTED?: string
    E_INSECURE_APP_KEY?: string
    E_MISSING_APP_KEY?: string
    E_INVALID_ENV_VARIABLES?: string
    E_MISSING_COMMAND_NAME?: string
    E_COMMAND_NOT_FOUND?: string
    E_MISSING_FLAG?: string
    E_MISSING_FLAG_VALUE?: string
    E_MISSING_ARG?: string
    E_MISSING_ARG_VALUE?: string
    E_UNKNOWN_FLAG?: string
    E_INVALID_FLAG?: string
    E_MULTIPLE_REDIS_SUBSCRIPTIONS?: string
    E_MULTIPLE_REDIS_PSUBSCRIPTIONS?: string
    E_MAIL_TRANSPORT_ERROR?: string
    E_SESSION_NOT_MUTABLE?: string
    E_SESSION_NOT_READY?: string
    // Common input error codes
    email?: string
    fullName?: string
    // Allow any other error codes
    [key: string]: string | undefined
}

// Can be accessed in a controller with `session.flashMessages.all()`
export type FlashMessages = HttpContext['session']['flashMessages']['all'] & {
    errorsBag?: ErrorsBag
}