import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchPrivateAPI } from '@/lib/api'

export async function GET() {
    redirect('/login')
}

export async function POST() {
    try {
        const response = await fetchPrivateAPI('auth/logout', {
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