import { reactive } from 'vue'

export const store = reactive({
    isMenuOpen: false,
    avatar: '',

    // Methods
    setAvatar(avatar) {
        this.avatar = avatar
    },

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
    },

    closeMenu() {
        this.isMenuOpen = false
    },
})