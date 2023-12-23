import { create } from 'zustand'
import type { TypeBook } from '@/lib/models/book'

interface CartItem extends TypeBook {
    quantity: number
}

type CartStore = {
    items: CartItem[]
    addToCart: (book: TypeBook) => void
    removeFromCart: (book: TypeBook) => void
    clearCart: () => void
}

const itemsStorage: CartItem[] = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('cartItems') || '[]') : []

export const useCartStore = create<CartStore>((set) => ({
    items: itemsStorage,
    addToCart: (book) => {
        set((state) => {
            // check if book already in cart
            const existingBook = state.items.find((item) => item.id === book.id)

            if (existingBook) {
                alert('Book already in cart')

                return state
            }

            // just one item per book & save to local storage
            const items = [...state.items, { ...book, quantity: 1 }]
            window.localStorage.setItem('cartItems', JSON.stringify(items))

            return { items }
        })
    },
    removeFromCart: (book) => {
        set((state) => {
            // remove from cart
            const items = state.items.filter((item) => item.id !== book.id)
            window.localStorage.setItem('cartItems', JSON.stringify(items))

            return { items }
        })
    },
    clearCart: () => {
        set(() => {
            // clear local storage
            window.localStorage.removeItem('cartItems')

            return { items: [] }
        })
    },
}))