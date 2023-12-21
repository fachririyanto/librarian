'use client'

import { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'

import { SearchForm } from '../searchform'

export default function MenuSearch() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <li className="">
            <Dialog open={ isOpen } onOpenChange={ setIsOpen }>
                <DialogTrigger className="block">
                    <span className="material-symbols-outlined block">search</span>
                </DialogTrigger>
                <DialogContent>
                    <div className="py-4">
                        <h4 className="mb-1 font-semibold">Find a book</h4>
                        <SearchForm baseUrl="/" placeholder="Type and enter..." cb={ () => setIsOpen(false) } />
                    </div>
                </DialogContent>
            </Dialog>
        </li>
    )
}