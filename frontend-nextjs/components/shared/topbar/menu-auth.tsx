import Link from 'next/link'
import { ButtonLogout } from '../button-logout'

export default function MenuAuth() {
    return (
        <>
            <li className="">
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="">
                <ButtonLogout>
                    Logout
                </ButtonLogout>
            </li>
        </>
    )
}