'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { deleteToken } from './actions'

interface ButtonDeleteTokenProps {
    tokenId: number
}

export function ButtonDeleteToken({ tokenId }: ButtonDeleteTokenProps) {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const handleDelete = async (id: number) => {
        setLoading(true)

        await deleteToken(id)

        // refresh page
        router.refresh()

        setLoading(false)
    }

    return (
        <Button onClick={ () => handleDelete(tokenId) } className="min-w-[80px]">
            { loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Delete' }
        </Button>
    )
}