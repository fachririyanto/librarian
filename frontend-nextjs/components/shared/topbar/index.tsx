import Link from 'next/link'

export default function Topbar() {
    return (
        <header className="h-16">
            <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-black text-white">
                <div className="px-4 flex h-full items-center">
                    <Link href="/" className="uppercase font-semibold leading-none">
                        { process.env.NEXT_PUBLIC_APP_NAME }
                    </Link>
                </div>
            </nav>
        </header>
    )
}