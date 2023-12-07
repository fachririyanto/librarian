<template>
    <header class="h-16">
        <nav class="fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-gray-200 lg:pl-[300px]">
            <div class="flex h-full px-4 items-center lg:pl-0 lg:pr-6">
                <div class="flex-grow">
                    <Link href="/admin/dashboard" class="flex lg:hidden items-center text-lg font-semibold text-gray-900 dark:text-white">
                        <img class="w-8 h-8 mr-3" src="/images/logo-laravel.svg" alt="">
                        {{ app.name }}
                    </Link>
                </div>
                <div class="pr-4">
                    <figure class="relative w-10 h-10 overflow-hidden rounded-full bg-[#ddd]">
                        <picture class="flex absolute inset-0">
                            <img
                                v-if="store.avatar !== null && store.avatar !== ''"
                                loading="lazy"
                                class="block w-full h-full object-cover rounded-full"
                                :src="'/storage/' + store.avatar"
                                :alt="auth.user.name"
                            />
                            <img
                                v-else
                                loading="lazy"
                                class="block w-full h-full object-cover rounded-full"
                                src="/images/mistery-man.png"
                                :alt="auth.user.name"
                            />
                        </picture>
                        <Link href="/admin/profile" class="absolute z-20 inset-0"></Link>
                    </figure>
                </div>
                <div class="lg:hidden">
                    <button class="block h-full" @click="store.toggleMenu">
                        <span class="material-symbols-outlined block text-3xl">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    import { store } from '../store'

    export default {
        data() {
            return {
                app: this.$page.props.app,
                auth: this.$page.props.auth,
                store,
            }
        },
        components: {
            Link,
        },
        beforeCreate() {
            store.setAvatar(this.$page.props.auth.user.avatar)
        },
    }
</script>