import Alpine from 'alpinejs'

/**
 * Alpine.js Setup
 *
 * This file initializes Alpine.js so you can use it to sprinkle client
 * side interactivity into your views.
 *
 * A NOTE ABOUT ALPINE's SYNTAX
 * 
 * The Alpine.js library supports two kinds of syntax. A longhand syntax, 
 * (like `x-on:click=`) and a shorthand syntax (like `@click=`). Both are
 * functionally identical (Alpine.js processes them the same way).
 * 
 * But this repo only supports the longhand alpine syntax. 
 * 
 * You could probably do some extra work to add support, but support for 
 * the Alpine shorthand can be flakey with code editors and SWC (used to
 * compile typescript in AdonisJS). 
 * 
 * So for simplicity I recommend just using the longhand syntax with 
 * Alpine. It might mean you need to tweak some online Alpine examples to
 * use long hand when copy pasting them. Examples:
 * 
 * @example
 * SUPPORTED        x-bind:class=
 * NOT SUPPORTED    :class=
 * @example
 * SUPPORTED        x-on:click=
 * NOT SUPPORTED    @click=
 *
*/

/**
 * Initialise any Alpine components here first, before starting
 * @see https://alpinejs.dev/globals/alpine-data#registering-from-a-bundle
 */
// ...[start your alpine components here]


// Start Alpine
Alpine.start()
console.log('Alpine started')
