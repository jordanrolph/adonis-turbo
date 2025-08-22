import { HttpContext } from '@adonisjs/core/http'

export type AuthenticatedUser = NonNullable<HttpContext['auth']['user']>
