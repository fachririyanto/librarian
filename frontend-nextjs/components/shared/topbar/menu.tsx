import Link from 'next/link'

export default function Menu() {
    return (
        <>
            <li className="">
                <Link href="/login">Login</Link>
            </li>
            <li className="">
                <Link href="/register">Register</Link>
            </li>
        </>
    )
}