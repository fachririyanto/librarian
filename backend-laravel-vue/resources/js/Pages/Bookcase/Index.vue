<template>
    <Master :title="title">
        <BlockTitle :title="title" />

        <Filters
            :hasActiveCheckbox="hasActiveCheckbox.value"
            :searchPlaceholder="`Search Bookcases`"
            :addNewLink="`/admin/bookcases/create`"
            :find="find"
            @findItems="findBookcase"
            @deleteSelectedItems="deleteSelectedBookcase" />

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
                            Bookcase Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Position
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
                    <tr v-for="bookcase in bookcases.data" class="bg-white border-b hover:bg-gray-50">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input @change="toggleCheckbox" :value="bookcase.id" id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ bookcase.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ bookcase.position }}
                        </td>
                        <td class="px-6 py-4">
                            {{ bookcase.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            <Link :href="'/admin/bookcases/edit/' + bookcase.id" class="inline font-medium text-app-primary hover:underline">Edit</Link>
                            <Link href="#" @click.prevent="deleteBookcase(bookcase.id)" class="inline ml-3 font-medium text-red-500 hover:underline">Delete</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :links="bookcases.links" class="mt-5 text-right" />
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
        toggleAllCheckbox,
        toggleCheckbox,
        deleteSelectedBookcase,
        deleteBookcase,
        findBookcase,
    } from './Filters'

    export default {
        props: {
            title: String,
            find: String,
            bookcases: Object,
        },
        data() {
            return {
                hasActiveCheckbox,
            }
        },
        methods: {
            findBookcase,
            deleteBookcase,
            deleteSelectedBookcase,
            toggleCheckbox,
            toggleAllCheckbox,
        },
        layout: Master,
        components: {
            Link,
            BlockTitle,
            Filters,
            Pagination,
        },
    }
</script>