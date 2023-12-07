<template>
    <div v-if="variant === 'info'" class="p-4 mb-4 font-semibold text-sm text-blue-800 rounded-lg bg-blue-50 border border-blue-300" role="alert">
        <slot></slot>
    </div>
    <div v-else-if="variant === 'success'" class="p-4 mb-4 font-semibold text-sm text-green-700 rounded-lg bg-green-50 border border-green-300" role="alert">
        <slot></slot>
    </div>
    <div v-else-if="variant === 'warning'" class="p-4 mb-4 font-semibold text-sm text-yellow-800 rounded-lg bg-yellow-50 border border-yellow-300" role="alert">
        <slot></slot>
    </div>
    <div v-else-if="variant === 'error'" class="p-4 mb-4 font-semibold text-sm text-red-800 rounded-lg bg-red-50 border border-red-300" role="alert">
        <slot></slot>
    </div>
    <div v-else class="p-4 mb-4 font-semibold text-sm text-gray-800 rounded-lg bg-gray-50 border border-gray-300" role="alert">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            variant: {
                type: String,
                default: 'default',
            },
        },
    }
</script>