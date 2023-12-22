import { NextResponse, type NextRequest } from 'next/server'
import { fetchPrivateAPI, fetchAPI } from '@/lib/api'
import { LoginResponse } from '@/lib/api/response'

export async function middleware(req: NextRequest) {
    const redirectUri = req.nextUrl.clone()

    // check if user is logged in
    // use case: logout all from other device
    if (req.cookies.has('token') && req.cookies.has('refresh_token')) {
        const res = await fetchPrivateAPI('auth/check-session', {
            method: 'POST',
        })

        // if user is not logged in, delete cookies
        if (res.code === 401) {
            redirectUri.pathname = '/login'

            const response = NextResponse.redirect(redirectUri.toString())
            response.cookies.delete('token')
            response.cookies.delete('refresh_token')

            return response
        }
    }

    // get refresh token
    // use case: user is logged in, but token is expired
    if (!req.cookies.has('token') && req.cookies.has('refresh_token')) {
        const res = await fetchAPI('auth/refresh-token', {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: req.cookies.get('refresh_token')?.value.toString(),
            }),
        })

        if (res.code === 200) {
            const data = res.data as LoginResponse

            redirectUri.pathname = '/api/auth/refresh'
            redirectUri.searchParams.set('token', data.token)
            redirectUri.searchParams.set('refresh_token', data.refresh_token)
            redirectUri.searchParams.set('duration', data.duration.toString())
            redirectUri.searchParams.set('redirect', req.nextUrl.pathname)

            const response = NextResponse.redirect(redirectUri.toString())

            response.cookies.delete('token')
            response.cookies.delete('refresh_token')

            return response
        } else {
            redirectUri.pathname = '/login'

            const response = NextResponse.redirect(redirectUri.toString())
            response.cookies.delete('token')
            response.cookies.delete('refresh_token')

            return response
        }
    }

    if (req.cookies.has('token')) {
        const authPaths = [
            '/login',
            '/register',
        ]

        if (authPaths.includes(req.nextUrl.pathname)) {
            redirectUri.pathname = '/dashboard'

            return NextResponse.redirect(redirectUri.toString())
        }
    } else {
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
            redirectUri.pathname = '/login'
            return NextResponse.redirect(redirectUri.toString(), req)
        }
    }

    return NextResponse.next({
        request: {
            headers: req.headers,
        },
    })
}

export const config = {
    matcher: [
        '/',
        '/book/:path*',

        // public user
        '/login',
        '/register',

        // logged user
        '/dashboard',
        '/dashboard/:path*',
    ],
}