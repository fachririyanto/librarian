<template>
    <div class="flex gap-4 relative h-11 rounded-md bg-gray-50 border border-gray-200 overflow-hidden cursor-pointer">
        <input
            ref="input"
            v-bind="{ ...$attrs }"
            type="file"
            class="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
            :accept="accept"
            @change="change"
        />
        <div class="flex h-full px-4 bg-yellow-300 items-center text-sm font-semibold cursor-pointer whitespace-nowrap">
            {{ label }}
        </div>
        <div class="flex flex-grow pr-3 h-full items-center text-sm max-w-full">
            <span v-if="error.length" class="text-red-500">
                {{ error[0] }}
            </span>
            <span v-else class="line-clamp-1 text-ellipsis">
                <span v-if="modelValue">
                    {{ modelValue.name }} - {{ fileSize(modelValue.size) }}
                </span>
                <span v-else>
                    No file selected
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: File | null,
            label: {
                type: String,
                default: 'Upload file',
            },
            accept: String,
            error: {
                type: Array,
                default: () => [],
            },
        },
        emits: ['update:modelValue'],
        watch: {
            modelValue(value) {
                if (!value) {
                    this.$refs.input.value = ''
                }
            },
        },
        methods: {
            fileSize(size) {
                const i = Math.floor(Math.log(size) / Math.log(1024))
                return (
                    (size / Math.pow(1024, i)).toFixed(2) * 1 +
                    ' ' +
                    ['B', 'kB', 'MB', 'GB', 'TB'][i]
                )
            },
            change(e) {
                this.$emit('update:modelValue', e.target.files[0])
            },
            remove() {
                this.$refs.input.value = ''
                this.$emit('update:modelValue', null)
            },
        },
    }
</script>