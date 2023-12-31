'use server'

import { fetchPrivateAPI } from '@/lib/api'
import type { UpdateProfileResponse } from '@/lib/api/response'

export async function updateProfile(data: FormData) {
    try {
        const response = await fetchPrivateAPI<UpdateProfileResponse>('private/update-profile', {
            method: 'POST',
            body: data,
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
            data: response.data,
        }
    } catch (error) {
        return {
            code: 500,
            message: 'Something went wrong',
            data: {
                member_id: 0,
                avatar: '',
            },
        }
    }
}