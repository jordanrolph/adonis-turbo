/**
 * These helpers will generate the path to your assets that you can use in views
 * If you are in production, it will also add a hash to the file name.
 *
 * Example usage in TSX template:
 * ```
 *      import { Vite } from '#view_helpers/asset_path_helper'
 *      // ...then, in component
 *      <Vite.Entrypoint entrypoints={['resources/css/app.scss', 'resources/js/app.js']} />
 * ```
 * Which will be transformed into HTML, something like:
 *  ```
 *      <link rel="stylesheet" href="/assets/app-abc123.css">
 *      <script type="module" src="/assets/app-def456.js"></script>
 *  ```
 */

import vite from '@adonisjs/vite/services/main'

function Image(props: { src: string; alt?: string; class?: string }) {
  const url = vite.assetPath(props.src)

  return <img src={url} alt={props.alt} class={props.class} />
}

async function Entrypoint(props: { entrypoints: string[] }) {
  const assets = await vite.generateEntryPointsTags(props.entrypoints)

  const elements = assets.map((asset) => {
    if (asset.tag === 'script') {
      return <script {...asset.attributes} />
    }

    return <link {...asset.attributes} />
  })

  return <>{elements} </>
}

export const Vite = {
  Entrypoint,
  Image,
}
