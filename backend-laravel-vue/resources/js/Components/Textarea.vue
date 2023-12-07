<template>
    <textarea
        v-bind="{ ...$attrs }"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block w-full p-3 rounded-md bg-gray-50 border border-gray-200"
    >{{ modelValue }}</textarea>
</template>

<script>
    export default {
        props: {
            modelValue: String,
        },
        emits: ['update:modelValue'],
    }
</script>