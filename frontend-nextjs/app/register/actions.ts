'use server'

import { fetchAPI } from '@/lib/api'
import type { RegisterResponse } from '@/lib/api/response'
import type { IFormRegister } from './type'

export async function doRegister({ name, email, password, repassword }: IFormRegister) {
    try {
        const response = await fetchAPI<RegisterResponse>('auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
                repassword,
            }),
        })

        if (response.code !== 200) {
            return {
                code: response.code,
                message: response.message,
                data: {},
            }
        }

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