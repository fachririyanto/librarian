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
                    <Uploadbox v-model="form.cover" @change="onFileChange" accept="image/*" />
                    <small class="block mt-1.5 text-sm">
                        Allowed types: .jpg, .jpeg, .png
                    </small>
                </div>
                <div v-if="form.cover_preview" class="mb-6">
                    <label for="coverPreview" class="block mb-2 text-sm font-medium">Cover Preview</label>
                    <figure>
                        <img loading="lazy" :src="form.cover_preview" alt="" class="w-32 object-cover rounded" />
                    </figure>
                    <span class="flex gap-3">
                        <a :href="form.cover_preview" target="_blank" class="inline-block mt-1 text-sm text-app-primary underline">View large image</a>
                        <button type="button" @click="removeCover" class="inline-block mt-1 text-sm text-red-500 underline">Remove</button>
                    </span>
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
            book: Object,
            categories: Object,
            bookcases: Object,
        },
        methods: {
            onFileChange(e) {
                const file = e.target.files[0]

                if (!file) {
                    return
                }

                this.form.cover_preview = URL.createObjectURL(file)
            },
            removeCover() {
                this.form.cover = ''
                this.form.cover_preview = ''
            },
            submit() {
                this.form.post(`/admin/books/edit/${this.book.id}`, {
                    forceFormData: true,
                    onSuccess: () => {
                        if (this.$page.props.flash.success) {
                            this.form.cover = ''
                        }
                    },
                })
            },
        },
        data() {
            return {
                form: this.$inertia.form({
                    title: this.book.title,
                    isbn: this.book.isbn,
                    author: this.book.author,
                    year: this.book.year,
                    publisher: this.book.publisher,
                    description: this.book.description,
                    stock: this.book.stock,
                    cover: '',
                    cover_old: this.book.cover,
                    cover_preview: this.book.cover === '' || this.book.cover === null ? '' : '/storage/' + this.book.cover,
                    category_id: this.book.category_id,
                    bookcase_id: this.book.bookcase_id,
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