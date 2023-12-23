'use client'

import { useState, useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cart'
import { usePathname } from 'next/navigation'
import { ImageCover } from '../image-cover'
import { getStorageURL } from '@/lib/api'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function MenuCart() {
    const { items, removeFromCart } = useCartStore()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const cartMenuRef = useRef<HTMLLIElement>(null)

    const router = usePathname()

    // handle click outside of user menu
    const handleClickOutside = (e: MouseEvent) => {
        if (cartMenuRef.current && !cartMenuRef.current.contains(e.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, { capture: true })
        return () => {
            document.removeEventListener('click', handleClickOutside, { capture: true })
        }
    }, [])

    // handle on router change
    useEffect(() => {
        setIsOpen(false)
    }, [router])

    return (
        <li className="relative" ref={ cartMenuRef }>
            <button onClick={ () => setIsOpen(!isOpen) }>
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="flex absolute top-0 right-0 z-10 -mt-3 -mr-3 bg-red-500 text-white w-5 h-5 text-xs rounded-full items-center justify-center">
                    { items.length }
                </span>
            </button>
            <ul className={ `${isOpen ? 'block' : 'hidden'} fixed top-16 right-0 bottom-0 z-10 bg-white text-black border border-gray-100 shadow-md p-5 w-[300px] leading-tight` }>
                <h3 className="pb-2 font-semibold border-b border-gray-100">
                    Recently added items
                </h3>
                { items.length ? (
                    <>
                        <ul className="">
                            { items.map((item) => (
                                <li key={ item.id } className="flex gap-3 py-2 border-b border-gray-100">
                                    <div className="flex flex-grow items-center">
                                        <div className="relative w-12 h-12 bg-gray-200 rounded">
                                            { item.cover && (
                                                <ImageCover
                                                    w={ 48 }
                                                    h={ 48 }
                                                    alt={ item.title }
                                                    src={ getStorageURL(item.cover) }
                                                    fill={ true }
                                                    className="rounded"
                                                />
                                            ) }
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="text-sm font-semibold leading-tight">
                                                { item.title }
                                            </h4>
                                            <p className="mt-0.5 text-xs">
                                                { item.author }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">                           
                                        <button onClick={ () => removeFromCart(item) } className="material-symbols-outlined text-red-600">delete</button>
                                    </div>
                                </li>
                            )) }
                        </ul>
                        <div className="mt-4">
                            <Link href="/checkout" className={ buttonVariants({ variant: 'default' }) + ' flex w-full' }>
                                Checkout
                            </Link>
                        </div>
                    </>
                ) : (
                    <p className="mt-3">
                        No items in cart
                    </p>
                ) }
            </ul>
        </li>
    )
}