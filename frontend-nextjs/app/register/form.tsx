'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { initialState, IFormRegister } from './type'
import { doRegister } from './actions'

export default function FormRegiter() {
    const [fields, setFields] = useState<IFormRegister>(initialState)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        doRegister(fields).then((data) => {
            if (data.code === 200) {
                setSuccess(data.message ?? 'Register success.')
                setError('')
                setFields(initialState)
            } else {
                setError(data.message ?? 'Something went wrong.')
                setSuccess('')
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            setError(err.message)
            setSuccess('')
        })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="mb-6">
                { error && <Alert variant="destructive">
                    <AlertDescription>{ error }</AlertDescription>
                </Alert> }

                { success && <Alert variant="default" className="border-green-500 text-green-600">
                    <AlertDescription>{ success }</AlertDescription>
                </Alert> }
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-1.5 text-sm">Name</label>
                <Input type="text" name="name" id="name" value={ fields.name } onChange={ handleChange } required />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1.5 text-sm">Email</label>
                <Input type="email" name="email" id="email" value={ fields.email } onChange={ handleChange } required />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-1.5 text-sm">Password</label>
                <Input type="password" name="password" id="password" value={ fields.password } onChange={ handleChange } minLength={ 8 } required />
            </div>
            <div className="mb-4">
                <label htmlFor="repassword" className="block mb-1.5 text-sm">Re-Password</label>
                <Input type="password" name="repassword" id="repassword" value={ fields.repassword } onChange={ handleChange } minLength={ 8 } required />
            </div>
            <div className="mt-6">
                <Button type="submit" className="flex gap-2.5 w-full items-center" disabled={ loading }>
                    { loading ? <Loader2 className="animate-spin inline-block" size={ 18 } /> : '' }
                    Register
                </Button>
            </div>
            <div className="mt-5 text-sm text-center">
                Already have an account? <Link href="/login" className="font-semibold hover:underline">Login</Link>
            </div>
        </form>
    )
}