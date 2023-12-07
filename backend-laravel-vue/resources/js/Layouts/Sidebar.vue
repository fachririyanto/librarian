<template>
    <aside id="app-sidebar" :class="store.isMenuOpen ? 'block' : 'hidden'" class="lg:block fixed top-0 left-0 bottom-0 z-40 w-[260px] bg-white border-r border-gray-200">
        <header class="relative p-5">
            <Link href="/admin/dashboard" class="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <img class="w-10 h-10 mr-4" src="/images/logo-laravel.svg" alt="">
                {{ app.name }}
            </Link>

            <button class="flex absolute w-10 h-10 items-center top-5 right-2 rounded bg-black text-white justify-center lg:hidden" @click="store.toggleMenu">
                <span class="material-symbols-outlined block text-2xl">close</span>
            </button>
        </header>
        <div class="py-4 px-5">
            <ul class="flex flex-wrap gap-1.5 text-sm">
                <li class="w-full">
                    <Link href="/admin/dashboard" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/dashboard') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">dashboard</span>
                        Dashboard
                    </Link>
                </li>
                <li class="my-4 w-full h-px bg-gray-100"></li>
                <li class="w-full">
                    <h3 class="mb-2 font-semibold uppercase text-xs text-gray-500">Data Master</h3>
                </li>
                <li class="w-full">
                    <Link href="/admin/books" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/books') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">menu_book</span>
                        Books
                    </Link>
                </li>
                <li class="w-full">
                    <Link href="/admin/category" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/category') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">category</span>
                        Categories
                    </Link>
                </li>
                <li class="w-full">
                    <Link href="/admin/bookcases" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/bookcases') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">location_on</span>
                        Bookcases (Position)
                    </Link>
                </li>
                <li v-if="canEditUsers()" class="w-full">
                    <Link href="/admin/users" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/users') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">group</span>
                        Users
                    </Link>
                </li>
                <li class="my-4 w-full h-px bg-gray-100"></li>
                <li class="w-full">
                    <h3 class="mb-2 font-semibold uppercase text-xs text-gray-500">Account</h3>
                </li>
                <li class="w-full">
                    <Link href="/admin/profile" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/profile') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">account_circle</span>
                        Update Profile
                    </Link>
                </li>
                <li class="w-full">
                    <Link href="/admin/change-password" class="flex gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100" :class="isUrl('admin/change-password') ? ' text-app-primary' : ''">
                        <span class="material-symbols-outlined block">settings</span>
                        Change Password
                    </Link>
                </li>
                <li class="w-full">
                    <Link as="button" href="/admin/logout" method="post" class="flex w-full gap-3 font-semibold items-center py-2 px-2 rounded-lg hover:bg-gray-100">
                        <span class="material-symbols-outlined block">logout</span>
                        Sign Out
                    </Link>
                </li>
            </ul>
        </div>
    </aside>
    <div v-if="store.isMenuOpen" class="absolute inset-0 z-30 bg-[rgba(0,0,0,.7)] lg:hidden"></div>
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    import { store } from '../store'

    export default {
        components: {
            Link,
        },
        data() {
            return {
                app: this.$page.props.app,
                auth: this.$page.props.auth,
                store,
            }
        },
        methods: {
            canEditUsers() {
                return ['superadmin', 'admin'].includes(this.auth.user.role)
            },
            isUrl(...urls) {
                let currentUrl = this.$page.url.substr(1)

                if (urls[0] === '') {
                    return currentUrl === ''
                }
                return urls.filter((url) => currentUrl.startsWith(url)).length
            },
        },
        beforeMount() {
            // close sidebar when route changes
            this.$watch(
                () => this.$page.url,
                () => {
                    store.closeMenu()
                }
            )
        },
    }
</script>