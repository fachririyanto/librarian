<template>
    <Master :title="title">
        <BlockTitle :title="title" />

        <Filters
            :hasActiveCheckbox="hasActiveCheckbox.value"
            :searchPlaceholder="`Search Books`"
            :addNewLink="`/admin/books/create`"
            :find="find"
            @findItems="findBooks"
            @deleteSelectedItems="deleteSelectedBooks" />

        <div class="relative p-2 overflow-x-auto bg-white shadow rounded-md">
            <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-[#f5f5f5]">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all" type="checkbox" @change="toggleAllCheckbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="checkbox-all" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Book Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ISBN
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Created By
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody class="[&>*:last-child]:border-b-0">
                    <tr v-for="book in books.data" class="bg-white border-b hover:bg-gray-50">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input @change="toggleCheckbox" :value="book.id" id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ book.title }}
                        </th>
                        <td class="px-6 py-4">
                            {{ book.isbn }}
                        </td>
                        <td class="px-6 py-4">
                            {{ book.author }}
                        </td>
                        <td class="px-6 py-4">
                            {{ book.category_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ book.created_by_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ book.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            <Link :href="'/admin/books/edit/' + book.id" class="inline font-medium text-app-primary hover:underline">Edit</Link>
                            <Link href="#" @click.prevent="deleteBook(book.id)" class="inline ml-3 font-medium text-red-500 hover:underline">Delete</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :links="books.links" class="mt-5 text-right" />
    </Master>
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    import Master from '../../Layouts/Master.vue'
    import Filters from '../../Layouts/Filters.vue'
    import BlockTitle from '../../Components/BlockTitle.vue'
    import Pagination from '../../Components/Pagination.vue'

    import {
        hasActiveCheckbox,
        findBooks,
        deleteBook,
        deleteSelectedBooks,
        toggleCheckbox,
        toggleAllCheckbox,
    } from './Filters'

    export default {
        props: {
            title: String,
            find: String,
            books: Object,
        },
        data() {
            return {
                hasActiveCheckbox,
            }
        },
        layout: Master,
        components: {
            BlockTitle,
            Pagination,
            Link,
            Filters
        },
        methods: {
            findBooks,
            deleteBook,
            deleteSelectedBooks,
            toggleCheckbox,
            toggleAllCheckbox,
        },
    }
</script>