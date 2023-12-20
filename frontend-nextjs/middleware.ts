import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    })

    // get token from cookie
    const token = req.cookies.get('token')

    // if token not found, redirect to login
    const redirectUri = req.nextUrl.clone()

    if (token) {
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
            return NextResponse.redirect(redirectUri.toString())
        }
    }

    return response
}

export const config = {
    matcher: [
        '/',

        // public user
        '/login',
        '/register',

        // logged user
        '/dashboard',
        '/dashboard/:path*',
    ],
}