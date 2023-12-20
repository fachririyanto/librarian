import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import dynamic from 'next/dynamic'

const Menu = dynamic(() => import('./menu'))
const MenuAuth = dynamic(() => import('./menu-auth'))

export default async function Topbar() {
    const { isUserLoggedIn } = await useAuth()

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
                        <ul className="flex gap-6">
                            { isUserLoggedIn() ? <MenuAuth /> : <Menu /> }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}