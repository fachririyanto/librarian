import FormChangePassword from './form'

export default async function Page() {
    return (
        <section className="py-16 bg-gray-100">
            <div className="mx-auto px-4 max-w-[540px]">
                <h1 className="mb-6 font-semibold text-center text-[24px] md:text-[28px]">Change Password</h1>
                <div className="p-8 rounded bg-white shadow-md">
                    <FormChangePassword />
                </div>
            </div>
        </section>
    )
}