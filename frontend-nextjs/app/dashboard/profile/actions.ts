'use server'

import type { IFormProfile } from './type'
import { fetchPrivateAPI } from '@/lib/api'

export async function updateProfile(data: IFormProfile) {
    try {
        const response = await fetchPrivateAPI('private/update-profile', {
            method: 'POST',
            body: JSON.stringify(data),
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