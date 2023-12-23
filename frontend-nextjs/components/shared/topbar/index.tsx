import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import dynamic from 'next/dynamic'
import { getProfile } from '@/lib/auth'
import MenuSearch from './menu-search'

const Menu = dynamic(() => import('./menu'))
const MenuCart = dynamic(() => import('./menu-cart'), { ssr: false })
const MenuAuth = dynamic(() => import('./menu-auth'))

export default async function Topbar() {
    const { isUserLoggedIn } = await useAuth()
    const profile = await getProfile()

    return (
        <header className="h-16">
            <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-black text-white">
                <div className="flex gap-6 px-4 h-full items-center">
                    <div className="flex-grow">
                        <Link href="/" className="uppercase font-semibold leading-none">
                            { process.env.NEXT_PUBLIC_APP_NAME }
                        </Link>
                    </div>
                    <div className="">
                        <ul className="flex gap-6 items-center text-sm leading-none">
                            { isUserLoggedIn() && <li className=""><Link href="/dashboard">Dashboard</Link></li> }
                            <MenuSearch />
                            <MenuCart />
                            { isUserLoggedIn() ? <MenuAuth profile={ profile } /> : <Menu /> }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}