<template>
    <a
        v-if="alias === 'a'"
        v-bind="{ ...$attrs }"
        :class="$attrs.class"
        class="inline-flex h-11 px-6 text-sm uppercase font-semibold rounded-[40px] items-center justify-center bg-app-primary text-white">
        <slot></slot>
    </a>

    <Link
        v-else-if="alias === 'link'"
        v-bind="{ ...$attrs }"
        :class="$attrs.class"
        class="inline-flex h-11 px-6 text-sm uppercase font-semibold rounded-[40px] items-center justify-center bg-app-primary text-white">
        <slot></slot>
    </Link>

    <button
        v-else
        v-bind="{ ...$attrs }"
        :class="$attrs.class"
        class="inline-flex h-11 px-6 text-sm uppercase font-semibold rounded-[40px] items-center justify-center bg-app-primary text-white">
        <slot></slot>
    </button>
</template>

<script>
    import { Link } from '@inertiajs/vue3'

    export default {
        props: {
            alias: {
                type: String,
                default: 'button',
            },
        },
        components: {
            Link,
        },
    }
</script>