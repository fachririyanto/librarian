<template>
    <Head>
        <title>
            {{ title }} &mdash; {{ app.name }}
        </title>
    </Head>

    <section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold">
                <img class="w-12 h-12 mr-4" src="/images/logo-laravel.svg" alt="logo">
                {{ app.name }}
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="py-10 px-6 sm:px-8">
                    <h1 class="mb-6 text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form @submit.prevent="form.post('auth/login')">
                        <div v-if="$page.props.flash.error" class="mb-5">
                            <Alert variant="error">{{ page.props.flash.error }}</Alert>
                        </div>
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium">Email</label>
                            <Textbox v-model="form.email" type="email" name="email" id="email" placeholder="name@company.com" required="" />
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                            <Textbox v-model="form.password" type="password" name="password" id="password" placeholder="••••••••" required="" />
                        </div>
                        <Button :disabled="form.processing" type="submit" class="w-full">
                            <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { Head, usePage, useForm } from '@inertiajs/vue3'
    import Alert from '../../Components/Alert.vue'
    import Textbox from '../../Components/Textbox.vue'
    import Button from '../../Components/Button.vue'
    import Spinner from '../../Components/Spinner.vue'

    const page = usePage()
    const app = page.props.app

    const form = useForm({
        email: '',
        password: '',
    })

    defineProps({
        title: String,
    })
</script>