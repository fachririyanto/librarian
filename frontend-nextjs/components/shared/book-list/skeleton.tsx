import { BookCardSkeleton } from '../book-card'

interface BookListSkeletonProps {
    count?: number
}

export function BookListSkeleton({ count = 5 }: BookListSkeletonProps) {
    return (
        <div className="flex flex-wrap -mx-2">
            { Array.from({ length: count }).map((_, i) => (
                <div key={ i } className="px-2 pb-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <BookCardSkeleton />
                </div>
            )) }
        </div>
    )
}