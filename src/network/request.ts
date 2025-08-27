import { NetworkError } from '../errors';

export interface RequestOptions {
    url: string,
    method: 'get' | 'post' | 'delete' | 'put' | 'patch',
    data?: any,
    headers?: { [index: string]: string } | Headers,
    timeout?: number
}

const httpMethods = {
    /**
     * Get
     * @param options
     */
    get(options: RequestOptions, signal?: AbortSignal): Promise<Response> {
        const queryParams = options.data
            ? Object.fromEntries(Object.entries<any>(options.data).filter(([, value]) => value))
            : undefined;
        const params =
            new URLSearchParams(options.data ? queryParams : undefined);

        return fetch(`${options.url}?${params.toString()}`, {
            method: 'GET',
            headers: options.headers,
            mode: 'cors',
            credentials: 'include',
            cache: 'default',
            signal
        });
    },

    /**
     * Post
     * @param options
     */
    post(options: RequestOptions, signal?: AbortSignal): Promise<Response> {
        return fetch(options.url, {
            method: 'POST',
            body: options.data instanceof FormData
                ? options.data
                : JSON.stringify(options.data),
            headers: options.headers,
            credentials: 'include',
            mode: 'cors',
            cache: 'default',
            signal
        });
    }
}

/**
 * Wrapper around fetch
 * @param options
 */
export function request(options: RequestOptions): Promise<Response> {
    let abortTimer: NodeJS.Timeout;
    let abortController: AbortController;
    let signal: AbortSignal;

    if (options.timeout) {
        abortController = new AbortController();
        signal = abortController.signal;

        abortTimer = setTimeout(() => {
            abortController.abort();
        }, options.timeout);
    }

    if (!Object.keys(httpMethods).includes(options.method)) {
        throw new Error(`[loufairy] Network/request: Invalid HTTP method: ${options.method}`);
    }

    if (options.headers === undefined) {
        options.headers = new Headers();
    } else if (!(options.headers instanceof Headers)) {
        const headers = new Headers();

        for (const [header, value] of Object.entries(options.headers)) {
            if (value) {
                headers.append(header, value);
            }
        }

        options.headers = headers;
    }

    try {
        return httpMethods[options.method](options, signal)
            .finally(() => {
                if (abortTimer) {
                    clearTimeout(abortTimer);
                }
            });
    } catch (error) {
        if (['Load failed',
            'NetworkError when attempting to fetch resource',
            'Failed to fetch'].includes(error.message)) {
            throw new NetworkError();
        }

        throw error;
    }
}
