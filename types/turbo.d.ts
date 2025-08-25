import type { Request, Response } from '@adonisjs/core/http'

// Add request.isTurbo() and response.turbo() methods to normal request response objects
declare module '@adonisjs/core/http' {
    interface Request {
        isTurbo(): boolean
    }

    interface Response {
        turbo(content: JSX.Element): JSX.Element
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
                children?: Kita.Children;
                [key: string]: any;
            };
            'turbo-stream': {
                action?: 'append' | 'prepend' | 'replace' | 'update' | 'remove';
                target?: string;
                targets?: string;
                children?: Kita.Children;
                [key: string]: any;
            };
        }
    }
}