import app from '@adonisjs/core/services/app'

/**
 * This helper allows you to easily log any variable when working on a view template.
 * The logs will be hidden in production, so it doesn't matter if you leave them in a template
 *
 * Example usage in a view or component: `{inspect(flashMessages)}`
 * Renders: `<code>{"errorsBag": "{...etc}"}</code>
 */
export function inspect(value: any) {
    if (app.inDev) {
        return <code safe>{JSON.stringify(value, null)} </code>
    }

    return null
}
