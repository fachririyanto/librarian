import { Inter, Source_Serif_4 } from 'next/font/google'

export const fontSans = Inter({
    subsets: ['latin'],
    variable: "--font-sans",
})

export const fontSerif = Source_Serif_4({
    subsets: ['latin'],
    variable: "--font-serif",
})