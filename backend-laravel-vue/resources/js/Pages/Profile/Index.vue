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
                <div class="flex gap-8">
                    <figure class="relative min-w-[96px] w-24 h-24 rounded-full overflow-hidden">
                        <picture class="flex absolute inset-0">
                            <img v-if="form.avatar_preview" loading="lazy" :src="form.avatar_preview" :alt="profile.name" class="block w-full h-full object-cover">
                            <img v-else loading="lazy" src="/images/mistery-man.png" :alt="profile.name" class="block w-full h-full object-cover">
                        </picture>
                    </figure>
                    <div class="flex-grow self-center">
                        <div>
                            <label for="stock" class="block mb-2 text-sm font-medium">
                                Photo (Max. 1MB)
                            </label>
                            <Uploadbox v-model="form.avatar" accept="image/*" label="Change Photo" @change="onFileChange" />
                            <small class="block mt-1.5 text-sm">
                                Allowed types: .jpg, .jpeg, .png
                            </small>
                            <button v-if="form.avatar_preview !== '' && form.avatar_preview !== null" type="button" @click="removePhoto" class="inline-block mt-1.5 text-sm text-red-500">Remove Photo</button>
                        </div>
                    </div>
                </div>
                <div class="my-6 h-px bg-gray-100"></div>
                <div class="mb-6">
                    <label for="userEmail" class="block mb-2 text-sm font-medium">Email<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.email" type="text" id="userEmail" name="userEmail" />
                </div>
                <div class="mb-6">
                    <label for="userName" class="block mb-2 text-sm font-medium">Display Name<span class="text-red-500">*</span></label>
                    <Textbox v-model="form.name" type="text" id="userName" name="userName" />
                </div>
                <div class="text-right">
                    <Button :disabled="form.processing" type="submit">
                        <Spinner v-if="form.processing" width="w-5" height="h-5" class="mr-2.5" />
                        Update Profile
                    </Button>
                </div>
            </form>
        </div>
    </Master>
</template>

<script>
    import { store } from '../../store'
    import Master from '../../Layouts/Master.vue'
    import Alert from '../../Components/Alert.vue'
    import BlockTitle from '../../Components/BlockTitle.vue'
    import Textbox from '../../Components/Textbox.vue'
    import Button from '../../Components/Button.vue'
    import Spinner from '../../Components/Spinner.vue'
    import Uploadbox from '../../Components/Uploadbox.vue'

    export default {
        props: {
            title: {
                type: String,
                default: 'Profile',
            },
            profile: {
                type: Object,
                default: {},
            },
        },
        data() {
            return {
                form: this.$inertia.form({
                    email: this.profile.email,
                    name: this.profile.name,
                    avatar: '',
                    avatar_preview: this.profile.avatar === '' || this.profile.avatar === null ? '' : '/storage/' + this.profile.avatar,
                    avatar_old: this.profile.avatar,
                }),
            }
        },
        methods: {
            onFileChange(e) {
                const file = e.target.files[0]

                if (!file) {
                    return
                }

                this.form.avatar_preview = URL.createObjectURL(file)
            },
            removePhoto() {
                this.form.avatar = ''
                this.form.avatar_preview = ''
            },
            submit() {
                this.form.post('/admin/profile', {
                    forceFormData: true,
                    onSuccess: () => {
                        if (this.$page.props.flash.success) {
                            this.form.avatar = ''
                            this.form.avatar_preview = this.profile.avatar === '' || this.profile.avatar === null ? '' : '/storage/' + this.profile.avatar
                            this.form.avatar_old = this.profile.avatar

                            store.setAvatar(this.profile.avatar)
                        }
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
            Uploadbox,
        },
    }
</script>