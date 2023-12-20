import Link from 'next/link'

interface BreadcrumbProps {
    items: {
        href: string,
        label: string,
    }[],
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <div className="flex items-center gap-2 text-sm">
            {
                items.map((item, index) => (
                    item.href === '' ? (
                        <span className="flex gap-2 items-center" key={ index }>
                            { index == 0 ? null : <span className="material-symbols-outlined">chevron_right</span> }
                            <span>{ item.label }</span>
                        </span>
                    ) : (
                        <Link key={ index } href={ item.href } className="flex gap-2 items-center">
                            { index == 0 ? null : <span className="material-symbols-outlined">chevron_right</span> }
                            { item.label }
                        </Link>
                    )
                ))
            }
        </div>
    )
}