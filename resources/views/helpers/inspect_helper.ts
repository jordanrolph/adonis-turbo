import app from '@adonisjs/core/services/app'
import { Html } from '@kitajs/html'

// A helper to easily log any variable when working on a view template.
// The logs will be hidden in production, so it doesn't matter if you leave them in a template.
// Example in a component: `{inspect(flashMessages)}` returns `<code>{"errorsBag": "{...etc}"}</code>
export function inspect(value: any) {
    if (app.inDev) {
        return Html.createElement('code', {}, JSON.stringify(value, null))
    }

    return null
}
