'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IFormProfile } from './type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { updateProfile } from './actions'
import { getStorageURL } from '@/lib/api'
import { ImageCover } from '@/components/shared/image-cover'
import type { TypeMember } from '@/lib/models/member'

export default function FormProfile({ data }: { data: TypeMember }) {
    const [fields, setFields] = useState<IFormProfile>({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        avatar: '',
        avatarOld: data.avatar,
        avatarPreview: data.avatar ? getStorageURL(data.avatar) : ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const inputAvatarRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }

    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target

        if (files && files.length) {
            const file = files[0]
            const reader = new FileReader()

            reader.onload = (e) => {
                const fileUrl = e.target?.result as string

                setFields({
                    ...fields,
                    avatar: file,
                    avatarPreview: fileUrl
                })
            }

            reader.readAsDataURL(file)
        }
    }

    const handleRemoveAvatar = () => {
        inputAvatarRef.current?.value ? inputAvatarRef.current.value = '' : null
        setFields({ ...fields, avatar: '', avatarOld: '', avatarPreview: '' })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        // setup form data
        const formData = new FormData()
        formData.append('name', fields.name)
        formData.append('phone', fields.phone)
        formData.append('address', fields.address)
        formData.append('avatar', fields.avatar || '')
        formData.append('avatar_old', fields.avatarOld || '')

        updateProfile(formData)
            .then(() => {
                setLoading(false)
                setSuccess('Profile has been updated.')

                inputAvatarRef.current?.value ? inputAvatarRef.current.value = '' : null

                setTimeout(() => {
                    router.refresh()
                }, 0)
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message)

                inputAvatarRef.current?.value ? inputAvatarRef.current.value = '' : null
            })
    }

    return (
        <form onSubmit={ handleSubmit }>
            { error ? (
                <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{ error }</AlertDescription>
                </Alert>
            ) : '' }

            { success ? (
                <Alert variant="default" className="mb-6 border-green-500 text-green-600">
                    <AlertDescription>{ success }</AlertDescription>
                </Alert>
            ) : '' }

            <div className="mb-4">
                <label htmlFor="email" className="block mb-1.5 text-sm">Email</label>
                <Input type="email" name="email" id="email" value={ fields.email } disabled={ true } required />
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-1.5 text-sm">Name</label>
                <Input type="text" name="name" id="name" value={ fields.name } onChange={ handleChange } required />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block mb-1.5 text-sm">Phone</label>
                <Input type="text" name="phone" id="phone" value={ fields.phone } onChange={ handleChange } required />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block mb-1.5 text-sm">Address</label>
                <Textarea name="address" id="address" value={ fields.address } onChange={ handleTextareaChange } rows={ 5 } required />
            </div>
            <div className="mb-4">
                <label htmlFor="avatar" className="block mb-1.5 text-sm">Avatar</label>

                { fields.avatarPreview ? (
                    <div className="flex gap-6 mb-2 items-center">
                        <div className="w-[100px] min-w-[100px]">
                            <ImageCover
                                src={ fields.avatarPreview }
                                alt={ fields.name }
                                w={ 100 }
                                h={ 100 }
                                className="rounded-full"
                                fill={ true }
                                priority={ true }
                            />
                        </div>
                        <div className="flex-grow">
                            <button type="button" className="text-sm text-red-600" onClick={ handleRemoveAvatar }>
                                Remove Avatar
                            </button>
                        </div>
                    </div>
                ) : null }

                <Input ref={ inputAvatarRef } type="file" name="avatar" id="avatar" onChange={ handleChangeAvatar } />
            </div>
            <div className="mt-6">
                <Button type="submit" className="flex gap-2.5 w-full items-center" disabled={ loading }>
                    { loading ? <Loader2 className="animate-spin inline-block" size={ 18 } /> : '' }
                    Update Profile
                </Button>
            </div>
        </form>
    )
}