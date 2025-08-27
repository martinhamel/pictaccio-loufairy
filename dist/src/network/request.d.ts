export interface RequestOptions {
    url: string;
    method: 'get' | 'post' | 'delete' | 'put' | 'patch';
    data?: any;
    headers?: {
        [index: string]: string;
    } | Headers;
    timeout?: number;
}
export declare function request(options: RequestOptions): Promise<Response>;
