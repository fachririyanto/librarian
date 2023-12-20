'use client'

import { useRouter } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import type { TypeCategory } from '@/lib/models/category'

interface SelectCategoriesProps {
    q: string | string[] | undefined,
    data: TypeCategory[],
}

export function SelectCategories({ q, data }: SelectCategoriesProps) {
    const router = useRouter()

    const handleChange = (value: string) => {
        if (value === 'all') {
            router.push('/?s=' + q)
        } else {
            router.push(`/?s=${q}&cat=${value}`)
        }
    }

    return (
        <Select onValueChange={ (value) => handleChange(value) }>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                { data.map((category: TypeCategory) => (
                    <SelectItem key={ category.id } value={ category.id.toString() }>
                        { category.name }
                    </SelectItem>
                )) }
            </SelectContent>
        </Select>
    )
}