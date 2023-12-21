'use client'

import { useState, useRef, useEffect } from 'react'
import { ImageCover } from '../image-cover'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { TypeMember } from '@/lib/models/member'
import { buttonVariants } from '@/components/ui/button'
import { ButtonLogout } from '@/components/shared/button-logout'
import { getStorageURL } from '@/lib/api'

interface MenuAuthProfileProps {
    profile: TypeMember | null
}

export default function MenuAuthProfile({ profile }: MenuAuthProfileProps) {
    if (!profile) {
        return null
    }

    const [showChild, setShowChild] = useState<boolean>(false)
    const userMenuRef = useRef<HTMLLIElement>(null)
    const router = usePathname()

    // handle click outside of user menu
    const handleClickOutside = (e: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
            setShowChild(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    // handle on router change
    useEffect(() => {
        setShowChild(false)
    }, [router])

    return (
        <>
            <li className="relative text-black" ref={ userMenuRef }>
                <a className="block w-8 h-8 overflow-hidden rounded-full bg-white cursor-pointer" onClick={ () => setShowChild(!showChild) }>
                    <ImageCover
                        w={ 32 }
                        h={ 32 }
                        alt={ profile.name }
                        src={ profile.avatar ? getStorageURL(profile.avatar) : '/images/mistery-man.png' }
                        fill={ true }
                    />
                </a>
                <ul className={ `${showChild ? 'block' : 'hidden'} absolute top-10 right-0 z-10 bg-white border border-gray-100 rounded-md shadow-md p-5 w-[300px] leading-tight` }>
                    <li className="mb-3 pb-5 border-b border-gray-100">
                        <h3 className="mb-1 font-semibold">
                            { profile.name }
                        </h3>
                        <span className="block font-medium normal-case font-normal text-app-font-gray">
                            { profile.email }
                        </span>
                    </li>
                    <li>
                        <Link href="/dashboard" className="block py-2 hover:text-app-primary">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/profile" className="block py-2 hover:text-app-primary">My Profile</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/change-password" className="block py-2 hover:text-app-primary">Change Password</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/login-history" className="block py-2 hover:text-app-primary">Login History</Link>
                    </li>
                    <li className="mt-3 pt-5 border-t border-gray-100">
                        <ButtonLogout className={ buttonVariants({ variant: 'default' }) + ' flex w-full' }>
                            Logout
                        </ButtonLogout>
                    </li>
                </ul>
            </li>
        </>
    )
}