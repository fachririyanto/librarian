import Link from 'next/link'
import Image from 'next/image'
import type { TypeBook } from '@/lib/models/book'
import { getStorageURL } from '@/lib/api'
import { BookCardSkeleton } from './skeleton'

function BookCard(book: TypeBook) {
    return (
        <div className="relative p-1.5 h-full bg-white rounded-lg shadow">
            <figure className="relative pt-[141.45%] bg-gray-200">
                { book.cover && (
                    <picture className="flex absolute inset-0">
                        <Image
                            src={ getStorageURL(book.cover) }
                            alt={ book.title }
                            fill={ true }
                            priority={ true }
                            className="rounded"
                            sizes="100%"
                        />
                    </picture>
                ) }
            </figure>
            <div className="pt-4 px-2 pb-2.5">
                <h3 className="font-semibold text-sm leading-tight">
                    { book.title }
                </h3>
                <p className="mt-0.5 text-[13px]">
                    { book.author }
                </p>
            </div>
            <Link href={ `/book/${book.id}` } className="absolute inset-0 z-10">
                <span className="sr-only">{ book.title }</span>
            </Link>
        </div>
    )
}

export {
    BookCard,
    BookCardSkeleton,
}