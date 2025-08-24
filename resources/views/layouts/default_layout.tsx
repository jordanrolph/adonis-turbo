import { Vite } from '#helpers/asset_path_helper'
import type { Children } from '@kitajs/html'

interface LayoutProps {
    children: Children
    pageTitle: string
}

export function DefaultLayout({ children, pageTitle }: LayoutProps) {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <title>{pageTitle} | Hello Adonis</title>
                </head>
                <body>
                    <Vite.Entrypoint entrypoints={['resources/css/app.css']} />
                    {children}
                </body>
            </html>
        </>
    )
}
