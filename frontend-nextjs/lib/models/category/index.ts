import type { TypeCategory } from './type'
import { fetchAPI } from '@/lib/api'
import type { API_Response } from '@/lib/api/response'

async function getCategories(): Promise<API_Response<TypeCategory[]>> {
    try {
        return await fetchAPI<TypeCategory[]>('public/categories')
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