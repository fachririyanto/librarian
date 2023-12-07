<template>
    <Master :title="title">
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
                    <label for="newPassword" class="block mb-2 text-sm font-medium">New Password<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.newPassword" type="password" id="newPassword" name="newPassword" />
                </div>
                <div class="mb-6">
                    <label for="confirmPassword" class="block mb-2 text-sm font-medium">Confirmation Password<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.confirmPassword" type="password" id="confirmPassword" name="confirmPassword" />
                </div>
                <div class="mb-6">
                    <label for="oldPassword" class="block mb-2 text-sm font-medium">Old Password<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.oldPassword" type="password" id="oldPassword" name="oldPassword" />
                </div>
                <div class="text-right">
                    <Button :disabled="form.processing" type="submit">
                        <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                        Change Password
                    </Button>
                </div>
            </form>
        </div>
    </Master>
</template>

<script>
    import Master from '../../Layouts/Master.vue'
    import Alert from '../../Components/Alert.vue'
    import BlockTitle from '../../Components/BlockTitle.vue'
    import Textbox from '../../Components/Textbox.vue'
    import Button from '../../Components/Button.vue'
    import Spinner from '../../Components/Spinner.vue'

    export default {
        props: {
            title: {
                type: String,
                default: 'Change Password',
            },
            profile: {
                type: Object,
                default: {},
            },
        },
        data() {
            return {
                form: this.$inertia.form({
                    _method: 'put',
                    newPassword: '',
                    confirmPassword: '',
                    oldPassword: '',
                }),
            }
        },
        methods: {
            submit() {
                this.form.put('/admin/change-password', {
                    onSuccess: () => {
                        this.form.reset()
                    },
                })
            },
        },
        layout: Master,
        components: {
            BlockTitle,
            Alert,
            Textbox,
            Button,
            Spinner,
        },
    }
</script>