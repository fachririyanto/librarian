import { getProfile } from '@/lib/auth'
import FormProfile from './form'

export default async function Page() {
    const profile = await getProfile()

    if (!profile) {
        return null
    }

    return (
        <section className="py-16 bg-gray-100">
            <div className="mx-auto px-4 max-w-[540px]">
                <h1 className="mb-6 font-semibold text-center text-[24px] md:text-[28px]">Update Profile</h1>
                <div className="p-8 rounded bg-white shadow-md">
                    <FormProfile data={ profile } />
                </div>
            </div>
        </section>
    )
}