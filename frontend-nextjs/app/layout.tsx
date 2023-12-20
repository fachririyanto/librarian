import type { Metadata } from 'next'
import { fontSans } from '@/lib/fonts'
import './global.css'
import Topbar from '@/components/shared/topbar'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + ' - Loaning Books App',
  description: process.env.NEXT_PUBLIC_APP_NAME + 'is an app for loaning books from the library.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className={ fontSans.className }>
        <Topbar />
        { children }
      </body>
    </html>
  )
}
