import type { Children } from '@kitajs/html'
import { Vite } from '#helpers/asset_path_helper'

interface DefaultLayoutProps {
    pageTitle: string
    children: Children
}

export function DefaultLayout({ pageTitle, children }: DefaultLayoutProps) {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{pageTitle}</title>

                    {/* Turbo setup */}
                    <meta name="turbo-cache-control" content="no-cache" />
                    <meta name="turbo-prefetch" content="true" />

                    <Vite.Entrypoint entrypoints={['resources/css/app.css', 'resources/js/app.js', 'resources/js/turbo.js']} />
                </head>
                <body>
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        </>
    )
}