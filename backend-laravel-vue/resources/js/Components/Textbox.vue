<template>
    <input
        v-bind="{ ...$attrs }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block h-11 w-full px-3 rounded-md bg-gray-50 border border-gray-200"
        />
</template>

<script>
    export default {
        props: {
            modelValue: String | Number,
        },
        emits: ['update:modelValue'],
    }
</script>