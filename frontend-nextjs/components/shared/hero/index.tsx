import { SearchForm } from '../searchform'

interface HeroProps {
    title: string,
    description: string,
}

export function Hero({ title, description }: HeroProps) {
    return (
        <header className="pt-20 pb-10">
            <div className="container">
                <div className="mx-auto max-w-[480px] text-center">
                    <h1 className={ ` font-semibold text-[28px] md:text-[32px] lg:text-[48px] leading-none` }>
                        { title }
                    </h1>
                    <p className="mt-2 mb-8">
                        { description }
                    </p>
                    <SearchForm baseUrl="" />
                </div>
            </div>
        </header>
    )
}