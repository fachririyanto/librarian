import Link from 'next/link'
import { getCategories, type TypeCategory } from '@/lib/models/category'
import { SidebarCategoriesSkeleton } from './skeleton'
import { SelectCategories } from './select-categories' 

interface SidebarCategoriesProps {
    q: string | string[] | undefined,
    cat: string | string[] | undefined,
}

async function SidebarCategories({ q, cat }: SidebarCategoriesProps) {
    const currentCat: string = cat ? cat.toString() : ''
    const { data } = await getCategories()

    return (
        <div>
            <h3 className="mb-3 font-semibold uppercase">
                Categories
            </h3>
            <div className="md:hidden">
                <SelectCategories q={ q } data={ data } />
            </div>
            <ul className="hidden md:flex flex-wrap flex-col gap-2.5">
                <li>
                    <Link
                        href={ `/?q=${q || ''}` }
                        className={ `flex items-center gap-2.5 hover:underline` }
                        >
                        <span className={ `w-3 h-3 bg-gray-200 rounded-full ${currentCat === '' ? 'bg-green-500' : ''}` }></span>
                        <span className="text-sm">
                            All
                        </span>
                    </Link>
                </li>
                {
                    data.map((category: TypeCategory) => (
                        <li key={ category.id }>
                            <Link
                                href={ `/?q=${q || ''}&cat=${category.id}` }
                                className={ `flex items-center gap-2.5 hover:underline` }
                                >
                                <span className={ `w-3 h-3 bg-gray-200 rounded-full ${category.id === parseInt(currentCat) ? 'bg-green-500' : ''}` }></span>
                                <span className="text-sm">
                                    { category.name }
                                </span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export {
    SidebarCategories,
    SidebarCategoriesSkeleton,
}