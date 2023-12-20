import type { TypeBook } from './type'
import { fetchAPI } from '@/lib/api'
import type { API_Response } from '@/lib/api/response'

type BookParams = {
    s?: string
    cat?: string
    page?: number
    limit?: number
}

async function getBooks(params: BookParams): Promise<API_Response<TypeBook[]>> {
    const queryParams: Record<string, any> = new URLSearchParams({
        s: params.s || '',
        cat: params.cat || '',
        page: params.page?.toString() || '1',
        limit: params.limit?.toString() || '10',
    })

    try {
        return await fetchAPI<TypeBook[]>('public/books?' + queryParams.toString())
    } catch (error) {
        return {
            data: [],
        }
    }
}

async function getRelatedBooks(id: string, limit: number): Promise<API_Response<TypeBook[]>> {
    try {
        return await fetchAPI<TypeBook[]>('public/books/related/' + id + '?limit=' + limit.toString())
    } catch (error) {
        return {
            data: [],
        }
    }
}

async function getBook(id: string): Promise<API_Response<TypeBook>> {
    try {
        return await fetchAPI<TypeBook>('public/books/' + id)
    } catch (error) {
        return {
            data: {} as TypeBook,
        }
    }
}

export {
    TypeBook,
    getBooks,
    getRelatedBooks,
    getBook,
}