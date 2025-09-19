import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type ExtendedRequest = HttpContext['request'] & {
  isTurbo(): boolean
}

type ExtendedResponse = HttpContext['response'] & {
  turboStream(content: JSX.Element): JSX.Element,
  turboFrame(content: JSX.Element): JSX.Element
}

// Adds hotwire turbo helper methods to the normal Adonis request/response objects. Usage:
// `request.isTurbo()` // => True if the request has a header asking for a turbo stream
// `response.turbo(<some-jsx>)` // => Adds turbo stream response header to the response

// TODO: add turbo as a new thing, not extending request response
// OR fix types so HomeController doesn't need types from turbo.d.ts when using these functions!
export default class TurboMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    // Extend request with isTurbo method
    const extendedRequest = request as ExtendedRequest
    extendedRequest.isTurbo = function () {
      const askingForTurboResponse = this.header("Accept") === "text/vnd.turbo-stream.html, text/html, application/xhtml+xml"
      const initiatedFromTurboFrame = !!this.header("turbo-frame")
      return askingForTurboResponse || initiatedFromTurboFrame;
    }

    // Extend response with turbo method
    const extendedResponse = response as ExtendedResponse
    extendedResponse.turboStream = function (content: JSX.Element) {
      this.header('content-type', 'text/vnd.turbo-stream.html')
      return content
    }

    extendedResponse.turboFrame = function (content: JSX.Element) {
      this.header('content-type', 'text/html')
      return content
    }

    await next()
  }
}