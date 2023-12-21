import type { TypeToken } from './type'
import { fetchPrivateAPI } from '@/lib/api'
import type { API_Response } from '@/lib/api/response'

async function getMemberTokens(): Promise<API_Response<TypeToken[]>> {
    try {
        return await fetchPrivateAPI<TypeToken[]>('private/list-tokens')
    } catch (error) {
        return {
            data: [],
        }
    }
}

export {
    TypeToken,
    getMemberTokens,
}