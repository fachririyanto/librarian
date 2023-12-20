'use client'

import { useState } from 'react'
import { IFormProfile } from './type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { updateProfile } from './actions'

export default function FormProfile({ data }: { data: IFormProfile }) {
    const [fields, setFields] = useState<IFormProfile>(data)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        updateProfile(fields)
            .then(() => {
                setLoading(false)
                setSuccess('Profile has been updated.')
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message)
            })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="mb-6">
                { error ? (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{ error }</AlertDescription>
                    </Alert>
                ) : '' }

                { success ? (
                    <Alert variant="default" className="border-green-500 text-green-600">
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{ success }</AlertDescription>
                    </Alert>
                ) : '' }
            </div>
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
            <div className="mt-6">
                <Button type="submit" className="flex gap-2.5 w-full items-center" disabled={ loading }>
                    { loading ? <Loader2 className="animate-spin inline-block" size={ 18 } /> : '' }
                    Update Profile
                </Button>
            </div>
        </form>
    )
}