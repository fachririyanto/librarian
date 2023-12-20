import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BookList } from '@/components/shared/book-list'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { getBook, getRelatedBooks } from '@/lib/models/book'
import { getStorageURL } from '@/lib/api'

export default async function Page({ params }: { params: { id: string } }) {
    const { data } = await getBook(params.id)

    const related = await getRelatedBooks(data.id.toString(), 4)

    return (
        <>
            <section>
                <div className="container-md">
                    <div className="py-4 border-b border-black">
                        <Breadcrumb items={[
                            { href: '/', label: 'Find Books' },
                            { href: '', label: data.title },
                        ]} />
                    </div>
                </div>
            </section>

            <section className="pt-10">
                <div className="container-md">
                    <div className="flex flex-wrap gap-6 sm:flex-nowrap sm:gap-10">
                        <div className="w-full sm:w-[260px] sm:min-w-[260px]">
                            <figure className="relative pt-[141.45%] overflow-hidden bg-gray-200">
                                <Suspense fallback={ null }>
                                    <Image
                                        src={ getStorageURL(data.cover) }
                                        alt={ data.title }
                                        fill={ true }
                                        priority={ true }
                                        sizes="100%"
                                        className="rounded"
                                    />
                                </Suspense>
                            </figure>
                        </div>
                        <div className="w-full sm:w-auto sm:flex-grow">
                            <header className="mb-6">
                                <h1 className="font-semibold text-[24px] md:text-[28px] lg:text-[32px] leading-none">
                                    { data.title }
                                </h1>
                                <span className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                                    <span>{ data.author }</span>
                                    <span>|</span>
                                    <span>Tahun: { data.year }</span>
                                    <span>|</span>
                                    <span>Kategori: <Link className="font-semibold text-black underline" href={ `/?cat=${data.category_id}` }>{ data.category_name }</Link></span>
                                </span>
                            </header>
                            <div className="">
                                <p className="mb-4 text-sm leading-relaxed">
                                    { data.description ?? 'No description.' }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="container-md">
                    <h2 className="mb-4 text-[18px] font-semibold">Related Books</h2>
                    <BookList data={ related.data } />
                </div>
            </section>
        </>
    )
}