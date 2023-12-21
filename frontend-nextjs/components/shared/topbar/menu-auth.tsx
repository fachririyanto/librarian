import MenuAuthProfile from './menu-auth-profile'
import type { TypeMember } from '@/lib/models/member'

interface MenuAuthProps {
    profile: TypeMember | null
}

export default function MenuAuth({ profile }: MenuAuthProps) {
    return (
        <MenuAuthProfile profile={ profile } />
    )
}