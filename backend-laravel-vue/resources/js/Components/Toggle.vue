<template>
    <label class="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            class="sr-only peer"
            :value="modelValue"
            :checked="isChecked"
            @change="toggle"
        />
        <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
</template>

<script>
    export default {
        props: {
            modelValue: String,
            checked: Boolean,
        },
        emits: ['update:modelValue'],
        data() {
            return {
                isChecked: this.checked,
            }
        },
        methods: {
            toggle() {
                this.isChecked = !this.isChecked
                this.$emit('update:modelValue', this.isChecked ? 'active' : 'inactive')
            }
        }
    }
</script>