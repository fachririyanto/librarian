'use server'

import { fetchPrivateAPI } from '@/lib/api'

export async function updatePassword(data: FormData) {
    try {
        const response = await fetchPrivateAPI('private/change-password', {
            method: 'POST',
            body: data
        })

        if (response.code !== 200) {
            return {
                code: response.code,
                message: response.message,
                data: {
                    member_id: 0,
                    avatar: '',
                },
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