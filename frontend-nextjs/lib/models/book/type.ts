export interface TypeBook {
    id: number
    title: string
    cover: string
    stock: number
    author: string
    publisher: string
    year: number
    category_id: number
    category_name: string
    description?: string
}