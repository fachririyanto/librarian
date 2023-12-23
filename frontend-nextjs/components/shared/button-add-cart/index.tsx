'use client'

import { useCartStore } from '@/store/cart'
import type { TypeBook } from '@/lib/models/book'

interface ButtonAddToCartProps {
    className?: string
    children: React.ReactNode
    book: TypeBook
}

export function ButtonAddToCart({ children, className, book }: ButtonAddToCartProps) {
    const { addToCart } = useCartStore()

    return (
        <button onClick={ () => addToCart(book) } className={ `cursor-pointer ${className}` }>
            { children }
        </button>
    )
}