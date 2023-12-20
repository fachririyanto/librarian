'use server'

import { fetchAPI } from '@/lib/api'
import type { LoginResponse } from '@/lib/api/response'
import useAuth from '@/hooks/useAuth'

export async function doLogin(email: string, password: string) {
    try {
        const response = await fetchAPI<LoginResponse>('auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        })

        if (response.code !== 200) {
            return {
                code: response.code,
                message: response.message,
                data: {},
            }
        }

        // Set cookie using useAuth hook
        const { setToken } = await useAuth()
        setToken(response.data)

        return {
            code: 200,
            message: 'Success',
            data: {},
        }
    } catch (error) {
        return {
            code: 500,
            message: 'Something went wrong',
            data: {},
        }
    }
}