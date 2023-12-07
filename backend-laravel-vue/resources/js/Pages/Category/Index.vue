<template>
    <Master :title="title">
        <BlockTitle :title="title" />

        <Filters
            :hasActiveCheckbox="hasActiveCheckbox.value"
            :searchPlaceholder="`Search Category`"
            :addNewLink="`/admin/category/create`"
            :find="find"
            @findItems="findCategory"
            @deleteSelectedItems="deleteSelectedCategory" />

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
                            Category Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Slug
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
                    <tr v-for="category in categories.data" class="bg-white border-b hover:bg-gray-50">
                        <td class="w-4 p-4">
                            <div v-if="category.id !== 1" class="flex items-center">
                                <input @change="toggleCheckbox" :value="category.id" id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ category.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ category.slug }}
                        </td>
                        <td class="px-6 py-4">
                            {{ category.created_by_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ category.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            <Link v-if="category.id !== 1" :href="'/admin/category/edit/' + category.id" class="inline font-medium text-app-primary hover:underline">Edit</Link>
                            <Link v-if="category.id !== 1" href="#" @click.prevent="deleteCategory(category.id)" class="inline ml-3 font-medium text-red-500 hover:underline">Delete</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :links="categories.links" class="mt-5 text-right" />
    </Master>
</template>

<script>
    import { Link } from '@inertiajs/vue3'
    import Master from '../../Layouts/Master.vue'
    import Filters from '../../Layouts/Filters.vue'
    import BlockTitle from '../../Components/BlockTitle.vue'
    import Alert from '../../Components/Alert.vue'
    import Pagination from '../../Components/Pagination.vue'

    import {
        hasActiveCheckbox,
        toggleAllCheckbox,
        toggleCheckbox,
        deleteSelectedCategory,
        deleteCategory,
        findCategory,
    } from './Filters'

    export default {
        props: {
            title: {
                type: String,
                default: 'Category',
            },
            find: {
                type: String,
                default: '',
            },
            categories: {
                type: Object,
                default: () => [],
            },
        },
        data() {
            return {
                hasActiveCheckbox,
            }
        },
        layout: Master,
        components: {
            Link,
            BlockTitle,
            Alert,
            Pagination,
            Filters,
        },
        methods: {
            toggleAllCheckbox,
            toggleCheckbox,
            deleteSelectedCategory,
            deleteCategory,
            findCategory,
        },
    }
</script>