import type { Request, Response } from '@adonisjs/core/http'
import type { Children } from "@kitajs/html"

// Add request.isTurbo() and response.turbo() methods to normal request response objects
declare module '@adonisjs/core/http' {
    interface Request {
        isTurbo(): boolean
    }

    interface Response {
        turboStream(content: JSX.Element): JSX.Element
        turboFrame(content: JSX.Element): JSX.Element
    }
}

// Extends the HTML tags that Kita understands so you can use <turbo-frame> and <turbo-stream> tags inside Kita views
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'turbo-frame': {
                id?: string;
                src?: string;
                loading?: 'eager' | 'lazy';
                'data-turbo-action'?: string;
                target?: string;
                children?: Children;
                [key: string]: any;
            };
            'turbo-stream': {
                action?: 'append' | 'prepend' | 'replace' | 'update' | 'remove';
                target?: string;
                targets?: string;
                children?: Children;
                [key: string]: any;
            };
        }
    }
}