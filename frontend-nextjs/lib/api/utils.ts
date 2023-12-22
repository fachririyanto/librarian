import {
    API_BASE_URL,
    API_ENDPOINT_URL,
    API_SECRET_KEY,
} from './'

import type { API_Response } from './response'

import useAuth from '@/hooks/useAuth'

// get storage url
export function getStorageURL(path?: string) {
    return API_BASE_URL + '/storage' + (path ? '/' + path : '')
}

// fetch public api wrapper
export async function fetchAPI<T>(path: string, params?: Object): Promise<API_Response<T>> {
    return fetch(`${API_ENDPOINT_URL}/${path}`, {
        headers: {
            'API-KEY': API_SECRET_KEY,
            'Content-Type': 'application/json',
        },
        ...params,
    }).then((res) => res.json())
}

// fetch private api wrapper
export async function fetchPrivateAPI<T>(path: string, params?: Object): Promise<API_Response<T>> {
    const { getToken } = await useAuth()

    return fetch(`${API_ENDPOINT_URL}/${path}`, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
        },
        ...params,
    }).then((res) => res.json())
}