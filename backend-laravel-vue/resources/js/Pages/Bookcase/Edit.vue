<template>
    <Master :title="title">
        <div class="mb-6">
            <Link href="/admin/bookcases" class="inline-flex gap-2 font-semibold items-center text-app-primary">
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
                    <label for="bookcaseName" class="block mb-2 text-sm font-medium">Bookcase Name<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.bookcaseName" type="text" id="bookcaseName" name="bookcaseName" />
                </div>
                <div class="mb-6">
                    <label for="position" class="block mb-2 text-sm font-medium">Position<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.position" type="text" id="position" name="position" />
                </div>
                <div class="text-right">
                    <Button :disabled="form.processing" type="submit">
                        <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                        Update Bookcase
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
            title: String,
            bookcase: Object,
        },
        methods: {
            submit() {
                this.form.post(`/admin/bookcases/edit/${this.bookcase.id}`)
            },
        },
        data() {
            return {
                form: this.$inertia.form({
                    bookcaseName: this.bookcase.name,
                    position: this.bookcase.position,
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