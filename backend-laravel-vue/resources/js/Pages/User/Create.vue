<template>
    <Master :title="title">
        <div class="mb-6">
            <Link href="/admin/users" class="inline-flex gap-2 font-semibold items-center text-app-primary">
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
                    <label for="email" class="block mb-2 text-sm font-medium">Email<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.email" type="email" id="email" name="email" required="" />
                </div>
                <div class="mb-6">
                    <label for="userName" class="block mb-2 text-sm font-medium">Display Name<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.userName" type="text" id="userName" name="userName" required="" />
                </div>
                <div class="mb-6">
                    <label for="role" class="block mb-2 text-sm font-medium">Role<span class="text-red-500">*</span></label>
                    <Selectbox v-model="form.role" id="role" name="role" required="">
                        <option value="">Select Role</option>
                        <option v-for="(item, index) in roles" :value="index">
                            {{ item }}
                        </option>
                    </Selectbox>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium">Password<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.password" type="password" id="password" name="password" required="" />
                </div>
                <div class="mb-6">
                    <label for="confirmPassword" class="block mb-2 text-sm font-medium">Confirm Password<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.confirmPassword" type="password" id="confirmPassword" name="confirmPassword" required="" />
                </div>
                <div class="mb-6">
                    <label for="status" class="block mb-2 text-sm font-medium">Active Status</label>
                    <Toggle v-model="form.status" id="status" name="status" :checked="form.status === 'active'" label="" />
                </div>
                <div class="text-right">
                    <Button :disabled="form.processing" type="submit">
                        <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                        Save User
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
    import Selectbox from '../../Components/Selectbox.vue'
    import Spinner from '../../Components/Spinner.vue'
    import Toggle from '../../Components/Toggle.vue'

    export default {
        props: {
            title: {
                type: String,
                default: 'Create User',
            },
            roles: {
                type: Object,
                default: {},
            },
        },
        methods: {
            submit() {
                this.form.post('/admin/users/create', {
                    onSuccess: () => {
                        if (this.$page.props.flash.success) {
                            this.form.reset()
                            this.form.email = ''
                            this.form.userName = ''
                            this.form.role = ''
                            this.form.status = 'active'
                            this.form.password = ''
                            this.form.confirmPassword = ''
                        }
                    },
                })
            },
        },
        data() {
            return {
                form: this.$inertia.form({
                    email: '',
                    userName: '',
                    role: '',
                    status: 'active',
                    password: '',
                    confirmPassword: '',
                }),
            }
        },
        components: {
            Master,
            BlockTitle,
            Alert,
            Button,
            Textbox,
            Selectbox,
            Spinner,
            Toggle,
            Link,
        },
        layout: Master,
    }
</script>