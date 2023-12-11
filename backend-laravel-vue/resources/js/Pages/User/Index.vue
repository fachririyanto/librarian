<template>
    <Master :title="title">
        <BlockTitle :title="title" />

        <Filters
            :hasActiveCheckbox="hasActiveCheckbox.value"
            :searchPlaceholder="`Search Users`"
            :addNewLink="`/admin/users/create`"
            :find="find"
            @findItems="findUsers"
            @deleteSelectedItems="deleteSelectedUsers" />

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
                            Display Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
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
                    <tr v-for="user in users.data" class="bg-white border-b hover:bg-gray-50">
                        <td class="w-4 p-4">
                            <div v-if="user.id !== 1" class="flex items-center">
                                <input @change="toggleCheckbox" :value="user.id" id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                            {{ user.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ user.role }}
                        </td>
                        <td class="px-6 py-4">
                            <span v-if="user.status === 'active'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                            </span>
                            <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Inactive
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            {{ user.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            <Link v-if="user.id !== 1" :href="'/admin/users/edit/' + user.id" class="inline font-medium text-app-primary hover:underline">Edit</Link>
                            <Link v-if="user.id !== 1" href="#" @click.prevent="deleteUser(user.id)" class="inline ml-3 font-medium text-red-500 hover:underline">Delete</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :links="users.links" class="mt-5 text-right" />
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
        deleteSelectedUsers,
        deleteUser,
        findUsers,
    } from './Filters'

    export default {
        props: {
            title: String,
            find: String,
            users: Object,
        },
        components: {
            Link,
            BlockTitle,
            Pagination,
            Filters,
        },
        layout: Master,
        data() {
            return {
                form: {
                    find: this.find || '',
                },
                hasActiveCheckbox,
            }
        },
        methods: {
            toggleAllCheckbox,
            toggleCheckbox,
            deleteSelectedUsers,
            deleteUser,
            findUsers,
        },
    }
</script>