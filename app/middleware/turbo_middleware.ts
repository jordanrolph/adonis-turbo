import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type ExtendedRequest = HttpContext['request'] & {
  isTurbo(): boolean
}

type ExtendedResponse = HttpContext['response'] & {
  turbo(content: JSX.Element): JSX.Element
}

// Adds hotwire turbo helper methods to the normal Adonis request/response objects. Usage:
// `request.isTurbo()` // => True if the request has a header asking for a turbo stream
// `response.turbo(<some-jsx>)` // => Adds turbo stream response header to the response
export default class TurboMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    // Extend request with isTurbo method
    const extendedRequest = request as ExtendedRequest
    extendedRequest.isTurbo = function () {
      return this.header("Accept") === "text/vnd.turbo-stream.html, text/html, application/xhtml+xml"
    }

    // Extend response with turbo method
    const extendedResponse = response as ExtendedResponse
    extendedResponse.turbo = function (content: JSX.Element) {
      this.header('content-type', 'text/vnd.turbo-stream.html')
      return content
    }

    await next()
  }
}