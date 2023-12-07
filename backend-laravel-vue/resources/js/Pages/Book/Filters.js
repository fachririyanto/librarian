import { reactive } from 'vue'

export const hasActiveCheckbox = reactive({
    value: 0,
    increment() {
        this.value++
    },
    reset() {
        this.value = 0
    },
})

export function findBooks(find) {
    this.$inertia.get(`/admin/books?find=${find}`)
}

export function toggleCheckbox() {
    hasActiveCheckbox.reset()

    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]')

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            hasActiveCheckbox.increment()
        }
    })
}

export function toggleAllCheckbox() {
    // get current state of the checkbox
    const checkbox = document.querySelector('#checkbox-all')
    const state = checkbox.checked

    // get all checkboxes
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]')

    if (checkboxes.length === 0) {
        return
    }

    // update hasActiveCheckbox
    state ? hasActiveCheckbox.increment() : hasActiveCheckbox.reset()

    // toggle all checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.checked = state
    })
}

export function resetAllCheckbox() {
    // get checkbox all
    const checkbox = document.querySelector('#checkbox-all')
    checkbox.checked = false

    // get all checkboxes
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]')

    if (checkboxes.length === 0) {
        return
    }

    // update hasActiveCheckbox
    hasActiveCheckbox.reset()

    // toggle all checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
    })
}

export function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        this.$inertia.delete(`/admin/books/delete/${id}`, {
            onSuccess: () => {
                // reset all checkboxes
                hasActiveCheckbox.value = 0
                resetAllCheckbox()
            },
        })
    }
}

export function deleteSelectedBooks() {
    if (confirm('Are you sure you want to delete selected books?')) {
        const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]')
        const ids = []

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                ids.push(checkbox.value)
            }
        })

        this.$inertia.delete(`/admin/books/delete-selected/${ids.join(',')}`, {
            onSuccess: () => {
                // reset all checkboxes
                hasActiveCheckbox.value = 0
                resetAllCheckbox()
            },
        })
    }
}