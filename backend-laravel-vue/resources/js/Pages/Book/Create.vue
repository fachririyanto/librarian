<template>
    <Master :title="title">
        <div class="mb-6">
            <Link href="/admin/books" class="inline-flex gap-2 font-semibold items-center text-app-primary">
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
                    <label for="title" class="block mb-2 text-sm font-medium">Title<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.title" type="text" id="title" name="title" required="" />
                </div>
                <div class="mb-6">
                    <label for="category" class="block mb-2 text-sm font-medium">Category<span class="text-red-500">*</span></label>
                    <Selectbox v-model="form.category_id" id="category" name="category" required="">
                        <option value="">Select Category</option>
                        <option v-for="category in categories" :value="category.id">
                            {{ category.name }}
                        </option>
                    </Selectbox>
                </div>
                <div class="mb-6">
                    <label for="isbn" class="block mb-2 text-sm font-medium">ISBN<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.isbn" type="text" id="isbn" name="isbn" required="" />
                </div>
                <div class="mb-6">
                    <label for="author" class="block mb-2 text-sm font-medium">Author<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.author" type="text" id="author" name="author" required="" />
                </div>
                <div class="mb-6">
                    <label for="publisher" class="block mb-2 text-sm font-medium">Publisher<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.publisher" type="text" id="publisher" name="publisher" required="" />
                </div>
                <div class="mb-6">
                    <label for="year" class="block mb-2 text-sm font-medium">Year<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.year" type="number" id="year" name="year" required="" />
                </div>
                <div class="mb-6">
                    <label for="description" class="block mb-2 text-sm font-medium">Description</label>
                    <Textarea v-model="form.description" id="description" name="description" rows="6"></Textarea>
                </div>
                <div class="mb-6">
                    <label for="bookcase" class="block mb-2 text-sm font-medium">Bookcase<span class="text-red-500">*</span></label>
                    <Selectbox v-model="form.bookcase_id" id="bookcase" name="bookcase" required="">
                        <option value="">Select Bookcase</option>
                        <option v-for="bookcase in bookcases" :value="bookcase.id">
                            {{ bookcase.name }} - {{ bookcase.position }}
                        </option>
                    </Selectbox>
                </div>
                <div class="mb-6">
                    <label for="stock" class="block mb-2 text-sm font-medium">Stock<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.stock" type="number" id="stock" name="stock" required="" />
                </div>
                <div class="mb-6">
                    <label for="stock" class="block mb-2 text-sm font-medium">Cover (Max. 2MB)</label>
                    <Uploadbox v-model="form.cover" accept="image/*" />
                    <small class="block mt-1.5 text-sm">
                        Allowed types: .jpg, .jpeg, .png
                    </small>
                </div>
                <div class="text-right">
                    <Button :disabled="form.processing" type="submit">
                        <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                        Save Book
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
    import Selectbox from '../../Components/Selectbox.vue'
    import Textarea from '../../Components/Textarea.vue'
    import Uploadbox from '../../Components/Uploadbox.vue'

    export default {
        props: {
            title: String,
            categories: Object,
            bookcases: Object,
        },
        methods: {
            submit() {
                this.form.post('/admin/books/create', {
                    forceFormData: true,
                    onSuccess: () => {
                        if (this.$page.props.flash.success) {
                            this.form.reset()
                            this.form.title = ''
                            this.form.isbn = ''
                            this.form.author = ''
                            this.form.year = ''
                            this.form.publisher = ''
                            this.form.description = ''
                            this.form.stock = 0
                            this.form.cover = ''
                            this.form.category_id = ''
                            this.form.bookcase_id = ''
                        }
                    },
                })
            },
        },
        data() {
            return {
                form: this.$inertia.form({
                    title: '',
                    isbn: '',
                    author: '',
                    year: '',
                    publisher: '',
                    description: '',
                    stock: 0,
                    cover: '',
                    category_id: '',
                    bookcase_id: '',
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
            Selectbox,
            Textarea,
            Uploadbox,
            Link,
        },
        layout: Master,
    }
</script>