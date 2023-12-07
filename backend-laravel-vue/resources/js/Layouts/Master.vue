<template>
    <Head>
        <title>
            {{ title }} &mdash; {{ app.name }}
        </title>
    </Head>

    <Topbar />

    <Sidebar />

    <div class="py-10 px-4 lg:pr-10 lg:pl-[300px]">
        <slot></slot>
    </div>
</template>

<script>
    import { Head } from '@inertiajs/vue3'
    import Topbar from './Topbar.vue'
    import Sidebar from './Sidebar.vue'

    export default {
        props: {
            app: Object,
            auth: Object,
            title: String,
        },
        components: {
            Head,
            Topbar,
            Sidebar,
        },
    }
</script>