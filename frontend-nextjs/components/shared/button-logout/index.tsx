'use client'

interface ButtonLogoutProps {
    className?: string
    children: React.ReactNode
}

export function ButtonLogout({ children, className }: ButtonLogoutProps) {
    return (
        <form method="POST" action="/api/auth/logout">
            <button type="submit" className={ `${className}` }>
                { children }
            </button>
        </form>
    )
}