import dynamic from 'next/dynamic'

const CartItems = dynamic(() => import('@/app/checkout/cart-items'), { ssr: false })

export default function Page() {

    return (
        <section className="py-16">
            <div className="mx-auto px-4 max-w-[540px]">
                <h1 className="mb-4 font-semibold text-[28px]">Checkout</h1>
                <CartItems />
            </div>
        </section>
    )
}