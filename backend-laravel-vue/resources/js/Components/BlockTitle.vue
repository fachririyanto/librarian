<template>
    <h1 class="mb-6 font-semibold text-xl md:text-2xl uppercase leading-none">
        {{ title }}
    </h1>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
        },
    }
</script>