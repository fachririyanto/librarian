interface SidebarCategoriesSkeletonProps {
    count?: number
}

export function SidebarCategoriesSkeleton({ count = 5 }: SidebarCategoriesSkeletonProps) {
    return (
        <div>
            <h3 className="mb-3 font-semibold uppercase">
                Categories
            </h3>
            <ul className="flex flex-wrap flex-col gap-2.5">
                { Array.from({ length: count }).map((_, i) => (
                    <li key={ i }>
                        <span className={ `flex items-center bg-gray-100 rounded-md` } >
                            <span className="text-sm">
                                &nbsp;
                            </span>
                        </span>
                    </li>
                )) }
            </ul>
        </div>
    )
}