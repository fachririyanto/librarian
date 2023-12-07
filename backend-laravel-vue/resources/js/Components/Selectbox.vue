<template>
    <div class="relative h-11 px-2.5 rounded-md bg-gray-50 border border-gray-200 overflow-hidden">
        <select
            v-bind="{ ...$attrs }"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="block h-full w-full bg-transparent outline-0 border-0">
            <slot></slot>
        </select>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: String | Number,
        },
        emits: ['update:modelValue'],
    }
</script>