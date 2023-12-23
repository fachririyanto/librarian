'use client'

import { useCartStore } from '@/store/cart'
import Link from 'next/link'
import { ImageCover } from '@/components/shared/image-cover'
import { getStorageURL } from '@/lib/api'
import { buttonVariants } from '@/components/ui/button'

export default function CartItems() {
    const { items, removeFromCart } = useCartStore()

    return (
        <div>
            { items.length ? (
                <>
                    <ul className="">
                        { items.map((item) => (
                            <li key={ item.id } className="flex gap-3 py-2 border-b border-gray-100">
                                <div className="flex flex-grow items-center">
                                    <div className="relative w-20 bg-gray-200 rounded">
                                        { item.cover && (
                                            <ImageCover
                                                w={ 1 }
                                                h={ 1 }
                                                alt={ item.title }
                                                src={ getStorageURL(item.cover) }
                                                fill={ true }
                                                className="rounded"
                                            />
                                        ) }
                                    </div>
                                    <div className="ml-5">
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
                    <div className="mt-4 text-right">
                        <Link href="/checkout" className={ buttonVariants({ variant: 'default' }) }>
                            Loan Books
                        </Link>
                    </div>
                </>
            ) : (
                <p className="mt-3">
                    No items in cart
                </p>
            ) }
        </div>
    )
}