import { fetchPrivateAPI } from '@/lib/api'
import type { ProfileResponse, LoginResponse } from '@/lib/api/response'

// refresh token
export async function refreshToken() {
    try {
        const response = await fetchPrivateAPI<LoginResponse>('auth/refresh-token')

        if (response.code !== 200) {
            return null
        }

        return response.data
    } catch (error) {
        return null
    }
}

// get profile
export async function getProfile() {
    try {
        const response = await fetchPrivateAPI<ProfileResponse>('auth/me')

        if (response.code !== 200) {
            return null
        }

        return response.data.member
    } catch (error) {
        return null
    }
}