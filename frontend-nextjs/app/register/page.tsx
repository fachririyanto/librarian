import FormRegister from './form'

export default function Page() {
    return (
        <section className="py-20">
            <div className="mx-auto px-4 max-w-[360px]">
                <h1 className="mb-4 font-semibold text-[28px]">Register</h1>
                <FormRegister />
            </div>
        </section>
    )
}