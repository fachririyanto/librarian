import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchPrivateAPI } from '@/lib/api'

export async function POST() {
    // get token from cookie
    const token: string | undefined = cookies().get('token')?.value.toString()

    // if token is not exist, redirect to login
    if (!token) {
        redirect('/login')
    }

    // call api
    try {
        const response = await fetchPrivateAPI('auth/logout', token, {
            method: 'POST',
        })

        if (response.code === 200) {
            // delete token from cookie
            cookies().delete('token')
            cookies().delete('refresh_token')
        }

        redirect('/login')
    } catch (error) {
        redirect('/login')
    }
}