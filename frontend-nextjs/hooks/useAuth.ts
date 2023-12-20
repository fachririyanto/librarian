'use server'

import { cookies } from 'next/headers'
import type { LoginResponse } from '@/lib/api/response'

export default async function useAuth() {
    const cookieStore = cookies()

    // get token
    const getToken = () => {
        const token: string | undefined = cookieStore.get('token')?.value.toString()
        return token
    }

    // set token
    const setToken = ({ token, refresh_token, duration }: LoginResponse) => {
        cookieStore.set('token', token, {
            path: '/',
            maxAge: duration,
        })

        cookieStore.set('refresh_token', refresh_token, {
            path: '/',
            maxAge: duration * 30,
        })
    }

    // check if user is logged in
    const isUserLoggedIn = () => {
        const refreshToken: string | undefined = cookieStore.get('refresh_token')?.value.toString()
        return refreshToken ? true : false
    }

    return {
        getToken,
        setToken,
        isUserLoggedIn,
    }
}