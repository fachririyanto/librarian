<template>
    <div class="flex flex-wrap md:flex-nowrap gap-4 mb-5">
        <div class="hidden w-full md:w-auto md:block">
            <Button
                alias="button"
                href="#"
                class="pl-4 pr-5"
                :disabled="hasActiveCheckbox ? false : true"
                :class="hasActiveCheckbox ? '' : 'opacity-60'"
                @click.prevent="$emit('deleteSelectedItems')">
                <span class="material-symbols-outlined mr-2">delete</span>
                Delete Selected
            </Button>
        </div>
        <div class="w-full md:w-auto md:flex-1">
            <form @submit.prevent="$emit('findItems', form.find)" class="relative max-w-[360px]">
                <Textbox v-model="form.find" type="text" name="find" :placeholder="searchPlaceholder" class="bg-white" />
                <span class="flex absolute top-0 right-0 bottom-0 z-10 items-center">
                    <span class="material-symbols-outlined mr-2">search</span>
                </span>
            </form>
        </div>
        <div class="w-auto md:hidden">
            <Button
                alias="button"
                href="#"
                class="pl-4 pr-5"
                :disabled="hasActiveCheckbox ? false : true"
                :class="hasActiveCheckbox ? '' : 'opacity-60'"
                @click.prevent="$emit('deleteSelectedItems')">
                <span class="material-symbols-outlined mr-2">delete</span>
                Delete Selected
            </Button>
        </div>
        <div class="w-auto">
            <Button alias="link" :href="addNewLink" class="pl-4 pr-5">
                <span class="material-symbols-outlined mr-2">add_circle</span>
                Add New
            </Button>
        </div>
    </div>
</template>

<script>
    import Button from '../Components/Button.vue'
    import Textbox from '../Components/Textbox.vue'

    export default {
        props: {
            hasActiveCheckbox: {
                type: Number,
                default: 0,
            },
            find: {
                type: String,
                default: '',
            },
            searchPlaceholder: {
                type: String,
                default: 'Search Items',
            },
            addNewLink: {
                type: String,
                default: '/',
            },
        },
        emits: ['findItems', 'deleteSelectedItems'],
        data() {
            return {
                form: {
                    find: this.find,
                },
            }
        },
        components: {
            Button,
            Textbox,
        },
    }
</script>