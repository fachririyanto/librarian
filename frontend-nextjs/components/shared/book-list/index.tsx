import { type TypeBook } from '@/lib/models/book'
import { BookCard } from '@/components/shared/book-card'
import { BookListSkeleton } from './skeleton'

interface BookListProps {
    data: TypeBook[]
}

function BookList({ data }: BookListProps) {
    return data.length ? (
        <div className="flex flex-wrap -mx-2">
            { data.map((book: TypeBook) => (
                <div key={ book.id } className="px-2 pb-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <BookCard { ...book } />
                </div>
            )) }
        </div>
    ) : (
        <div className="font-semibold text-sm">
            Data not found.
        </div>
    )
}

export {
    BookList,
    BookListSkeleton,
}