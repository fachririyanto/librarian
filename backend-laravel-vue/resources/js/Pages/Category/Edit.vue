<template>
    <Master :title="title">
        <div class="mb-6">
            <Link href="/admin/category" class="inline-flex gap-2 font-semibold items-center text-app-primary">
                <span class="material-symbols-outlined">arrow_back</span>
                Back
            </Link>
        </div>

        <BlockTitle :title="title" />

        <div class="p-6 max-w-[640px] bg-white shadow rounded">
            <form @submit.prevent="submit">
                <div v-if="$page.props.flash.error" class="mb-5">
                    <Alert variant="error">{{ $page.props.flash.error }}</Alert>
                </div>
                <div v-if="$page.props.flash.success" class="mb-5">
                    <Alert variant="success">{{ $page.props.flash.success }}</Alert>
                </div>
                <div class="mb-6">
                    <label for="categoryName" class="block mb-2 text-sm font-medium">Category Name<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.categoryName" type="text" id="categoryName" name="categoryName" />
                </div>
                <div class="mb-6">
                    <label for="categorySlug" class="block mb-2 text-sm font-medium">Category Slug</label>
                    <Textbox v-model="form.categorySlug" type="text" id="categorySlug" name="categorySlug" />
                </div>
                <div class="text-right">
                    <Button :disabled="form.processing" type="submit">
                        <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                        Update Category
                    </Button>
                </div>
            </form>
        </div>
    </Master>
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    import Master from '../../Layouts/Master.vue'
    import BlockTitle from '../../Components/BlockTitle.vue'
    import Alert from '../../Components/Alert.vue'
    import Button from '../../Components/Button.vue'
    import Textbox from '../../Components/Textbox.vue'
    import Spinner from '../../Components/Spinner.vue'

    export default {
        props: {
            title: {
                type: String,
                default: 'Edit Category',
            },
            category: {
                type: Object,
                default: () => {
                    return {
                        id: 0,
                        name: '',
                        slug: '',
                    }
                },
            },
        },
        methods: {
            submit() {
                this.form.post(`/admin/category/edit/${this.category.id}`)
            },
        },
        remember: ['form'],
        data() {
            return {
                form: this.$inertia.form({
                    categoryName: this.category.name,
                    categorySlug: this.category.slug,
                }),
            }
        },
        components: {
            Master,
            BlockTitle,
            Alert,
            Button,
            Textbox,
            Spinner,
            Link,
        },
        layout: Master,
    }
</script>