import {
    API_BASE_URL,
    API_ENDPOINT_URL,
    API_SECRET_KEY,
} from './'

import type { API_Response } from './response'

import useAuth from '@/hooks/useAuth'
import { refreshToken } from '../auth'

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
    const { getToken, isUserLoggedIn } = await useAuth()

    let token = getToken()

    if (!getToken() && isUserLoggedIn()) {
        // refresh token
        const newToken = await refreshToken()

        if (!newToken) {
            throw new Error('Failed to refresh token')
        }

        // set new token
        const { setToken } = await useAuth()
        setToken(newToken)

        // set token
        token = newToken.token
    }

    return fetch(`${API_ENDPOINT_URL}/${path}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        ...params,
    }).then((res) => res.json())
}