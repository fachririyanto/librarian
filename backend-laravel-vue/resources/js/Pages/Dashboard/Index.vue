<template>
    <Master :title="title">
        <BlockTitle :title="title" />

        <div class="p-6 max-w-[640px] bg-white shadow rounded">
            <header class="mb-5 pb-5 font-semibold border-b border-gray-100">
                Welcome, {{ auth.user.name }}
            </header>
            <p class="">
                Librarian is a free, open-source, and simple web application for managing a library. It is built on top of Laravel 10 and Vue.js.
            </p>
        </div>
    </Master>
</template>

<script>
    import Master from '../../Layouts/Master.vue'
    import BlockTitle from '../../Components/BlockTitle.vue'

    export default {
        props: {
            auth: Object,
            title: String,
        },
        layout: Master,
        components: {
            BlockTitle,
        },
    }
</script>