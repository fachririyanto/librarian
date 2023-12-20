import type { API_Response } from '@/lib/response'

// wrapper for fetch() function
export async function fetchPublicAPI<T>(path: string, params?: Object): Promise<API_Response<T>> {
    return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/public/${path}`, {
        headers: {
            'API-KEY': process.env.NEXT_PUBLIC_API_KEY,
        },
        ...params,
    }).then((res) => res.json())
}