import { getProfile } from '@/lib/auth'
import FormProfile from './form'

export default async function Page() {
    const profile = await getProfile()

    if (!profile) {
        return null
    }

    const { member } = profile

    return (
        <section className="py-20">
            <div className="mx-auto px-4 max-w-[480px]">
                <h1 className="mb-4 font-semibold text-[28px]">Profile</h1>
                <FormProfile data={ member } />
            </div>
        </section>
    )
}