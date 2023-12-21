'use server'

import { fetchPrivateAPI } from '@/lib/api'

export async function deleteToken(tokenId: number) {
    try {
        await fetchPrivateAPI('private/delete-token/' + tokenId, {
            method: 'DELETE',
        })

        return true
    } catch (error) {
        return false
    }
}