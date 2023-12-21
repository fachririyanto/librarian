import { getMemberTokens, TypeToken } from '@/lib/models/token'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { buttonVariants } from '@/components/ui/button'
import { ButtonLogoutAll, ButtonLogout } from '@/components/shared/button-logout'
import { ButtonDeleteToken } from './button-delete'
import { convertDate } from '@/lib/func'
import useAuth from '@/hooks/useAuth'

export default async function Page() {
    const { data } = await getMemberTokens()
    const { getToken } = await useAuth()

    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto px-4 max-w-[720px]">
                <h1 className="mb-6 font-semibold text-center text-[24px] md:text-[28px]">
                    Login History
                </h1>
                <div className="p-8 rounded bg-white shadow-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead>Login At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { data.map((token: TypeToken) => (
                                <TableRow key={ token.id }>
                                    <TableCell>{ token.ip_address }</TableCell>
                                    <TableCell>{ token.user_agent }</TableCell>
                                    <TableCell>{ convertDate(token.created_at) }</TableCell>
                                    <TableCell>
                                        {
                                            token.token === getToken() ?
                                                <ButtonLogout className={ buttonVariants({ variant: 'default'}) }>Logout</ButtonLogout> :
                                                <ButtonDeleteToken tokenId={ token.id } />
                                        }
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>

                    <div className="mt-10 mb-6 h-px bg-gray-200"></div>

                    <div className="">
                        Or you can logout from all devices:
                        <div className="mt-4">
                            <ButtonLogoutAll className={ buttonVariants({ variant: 'destructive' }) }>
                                Logout from all devices
                            </ButtonLogoutAll>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}