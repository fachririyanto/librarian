import { API_Response } from '@/lib/response'
import type { TypeCategory } from './type'
import { fetchPublicAPI } from '@/lib/fetch'

async function getCategories(): Promise<API_Response<TypeCategory[]>> {
    try {
        return await fetchPublicAPI<TypeCategory[]>('categories')
    } catch (error) {
        return {
            data: [],
        }
    }
}

export {
    TypeCategory,
    getCategories,
}