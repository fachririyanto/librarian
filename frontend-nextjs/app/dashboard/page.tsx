import { getProfile } from '@/lib/auth'
import { buttonVariants } from '@/components/ui/button'
import { ButtonLogout } from '@/components/shared/button-logout'

export default async function Page() {
    const profile = await getProfile()

    if (!profile) {
        return null
    }

    return (
        <section className="py-20">
            <div className="container-md">
                <h1 className="mb-3 font-semibold text-2xl leading-none">Dashboard Page</h1>
                <p className="mb-6">
                    Hello, { profile.name }
                </p>
                <ButtonLogout className={ buttonVariants({ variant: 'default' }) }>
                    Logout
                </ButtonLogout>
            </div>
        </section>
    )
}