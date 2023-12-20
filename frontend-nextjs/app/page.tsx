import { Suspense } from 'react'
import { Hero } from '@/components/shared/hero'
import { SidebarCategories, SidebarCategoriesSkeleton } from '@/components/shared/sidebar-categories'
import { BookList, BookListSkeleton } from '@/components/shared/book-list'
import { getBooks } from '@/lib/models/book'
import { Pagination } from '@/components/shared/pagination'

interface SearchProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    },
}

export default async function Page({ searchParams }: SearchProps) {
    const { q, cat, page } = searchParams

    const paging = {
        page: parseInt(page as string) || 1,
        limit: 10,
    }

    const { data, total } = await getBooks({
        s: q as string,
        cat: cat as string,
        page: paging.page,
        limit: paging.limit,
    })

    const buildQuery = (page: number) => {
        const query = new URLSearchParams({
            q: q as string || '',
            cat: cat as string || '',
            page: page.toString(),
        }).toString()

        return `?${query}`
    }

    return (
        <>
            <Hero
                title={ process.env.NEXT_PUBLIC_APP_NAME }
                description="App for loaning books from the library."
            />

            <section className="pb-10 md:py-10">
                <div className="container">
                    <div className="flex flex-wrap md:flex-nowrap">
                        <aside className="w-full md:w-[240px] md:min-w-[240px] md:pr-8 md:border-r md:border-gray-150">
                            <Suspense fallback={ <SidebarCategoriesSkeleton /> }>
                                <SidebarCategories q={ q } cat={ cat } />
                            </Suspense>
                        </aside>

                        <div className="w-full pt-10 md:pt-0 md:w-auto md:flex-grow md:pl-10">
                            <Suspense fallback={ <BookListSkeleton count={ 10 } /> }>
                                <BookList data={ data } />
                                <div className="mt-8 text-center">
                                    <Pagination
                                        totalItems={ total?? 0 }
                                        itemsPerPage={ paging.limit }
                                        currentPage={ paging.page }
                                        renderPageLink={ (page: number) => buildQuery(page) }
                                    />
                                </div>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}