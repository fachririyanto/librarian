import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const refreshToken = searchParams.get('refresh_token')
    const duration = searchParams.get('duration')
    const redirectUrl = searchParams.get('redirect')

    if (!token || !refreshToken || !duration || !redirectUrl) {
        redirect('/login')
    }

    const { setToken } = await useAuth()
    setToken({
        token,
        refresh_token: refreshToken,
        duration: parseInt(duration),
    })
    
    redirect(redirectUrl)
}