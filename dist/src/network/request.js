"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const errors_1 = require("../errors");
const httpMethods = {
    get(options, signal) {
        const queryParams = options.data
            ? Object.fromEntries(Object.entries(options.data).filter(([, value]) => value))
            : undefined;
        const params = new URLSearchParams(options.data ? queryParams : undefined);
        return fetch(`${options.url}?${params.toString()}`, {
            method: 'GET',
            headers: options.headers,
            mode: 'cors',
            credentials: 'include',
            cache: 'default',
            signal
        });
    },
    post(options, signal) {
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
};
function request(options) {
    let abortTimer;
    let abortController;
    let signal;
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
    }
    else if (!(options.headers instanceof Headers)) {
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
    }
    catch (error) {
        if (['Load failed',
            'NetworkError when attempting to fetch resource',
            'Failed to fetch'].includes(error.message)) {
            throw new errors_1.NetworkError();
        }
        throw error;
    }
}
exports.request = request;
//# sourceMappingURL=request.js.map