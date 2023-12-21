'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

interface SearchFormProps {
    baseUrl: string,
    q?: string | string[] | undefined,
    placeholder?: string,
    cb?: () => void
}

export function SearchForm({ baseUrl, q, placeholder = 'Find books...', cb }: SearchFormProps) {
    const router = useRouter()

    const [query, setQuery] = useState(q)

    const handleChange = (e: React.BaseSyntheticEvent) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`/${baseUrl}?q=${query}`)

        if (typeof cb === 'function') {
            cb()
        }
    }

    return (
        <form onSubmit={ handleSubmit } className="relative">
            <Input
                type="text"
                placeholder={ placeholder }
                value={ query }
                onChange={ handleChange }
                className="pl-0 border-0 outline-0 border-b-2 border-gray-150 !ring-0 rounded-none !ring-offset-0 focus:border-black"
            />
            <button type="submit" className="flex absolute top-0 right-0 bottom-0 z-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined">search</span>
            </button>
        </form>
    )
}