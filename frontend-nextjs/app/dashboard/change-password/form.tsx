'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { IFormChangePassword } from './type'
import { updatePassword } from './actions'

const initialFields: IFormChangePassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}

export default function FormChangePassword() {
    const [fields, setFields] = useState<IFormChangePassword>(initialFields)

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('old_password', fields.oldPassword)
            formData.append('new_password', fields.newPassword)
            formData.append('renew_password', fields.confirmPassword)

            const response = await updatePassword(formData)

            if (response.code === 200) {
                setSuccess('Password updated successfully')
                setError('')
            } else {
                setError(response.message || 'Failed to update password')
                setSuccess('')
            }
        } catch (err) {
            setError('Failed to update password')
            setSuccess('')
        }

        setLoading(false)
        setFields(initialFields)
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
                <label htmlFor="newPassword" className="block mb-1.5 text-sm">New Password</label>
                <Input type="password" name="newPassword" id="newPassword" value={ fields.newPassword } minLength={ 8 } onChange={ handleChange } required />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-1.5 text-sm">Confirm Password</label>
                <Input type="password" name="confirmPassword" id="confirmPassword" value={ fields.confirmPassword } minLength={ 8 } onChange={ handleChange } required />
            </div>
            <div className="mb-4">
                <label htmlFor="oldPassword" className="block mb-1.5 text-sm">Old Password</label>
                <Input type="password" name="oldPassword" id="oldPassword" value={ fields.oldPassword } minLength={ 8 } onChange={ handleChange } required />
            </div>
            <div className="mt-6">
                <Button type="submit" className="flex gap-2.5 w-full items-center" disabled={ loading }>
                    { loading ? <Loader2 className="animate-spin inline-block" size={ 18 } /> : '' }
                    Update Password
                </Button>
            </div>
        </form>
    )
}