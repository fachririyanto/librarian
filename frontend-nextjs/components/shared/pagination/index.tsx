import Link from 'next/link'
import { usePagination } from './hook'

export interface PaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    renderPageLink: (page: number) => string
}

export const dotts = '...'

export function Pagination({ totalItems, itemsPerPage = 5, currentPage, renderPageLink }: PaginationProps) {
    const pages = usePagination(totalItems, currentPage, itemsPerPage)

    return (
        <div className="flex gap-2 items-center justify-center">
            {
                pages.map((pageNumber, i) =>
                    pageNumber === dotts ? (
                        <span
                            key={ i }
                            className="block px-3 py-2 rounded text-sm font-semibold text-black bg-gray-50"
                        >
                            { pageNumber }
                        </span>
                    ) : (
                        <Link
                            key={ i }
                            href={ renderPageLink(pageNumber as number) }
                            className={`block ${
                            pageNumber === currentPage ? 'text-white bg-black' : 'text-black bg-gray-50 hover:bg-gray-100'
                            } px-3 py-2 rounded text-sm font-semibold no-underline` }
                        >
                            { pageNumber }
                        </Link>
                    )
                )
            }
        </div>
    )
}