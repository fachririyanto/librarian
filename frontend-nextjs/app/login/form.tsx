'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { doLogin } from './actions'

export default function FormLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        doLogin(email, password).then((data) => {
            if (data.code === 200) {
                router.push('/')
                return
            } else {
                setLoading(false)
                setError(data.message ?? 'Something went wrong.')
            }
        }).catch((err) => {
            setLoading(false)
            setError(err.message)
        })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="mb-6">
                { error && <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{ error }</AlertDescription>
                </Alert> }
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1.5 text-sm">Email</label>
                <Input type="email" name="email" id="email" value={ email } onChange={ (e) => setEmail(e.target.value) } required />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-1.5 text-sm">Password</label>
                <Input type="password" name="password" id="password" value={ password } onChange={ (e) => setPassword(e.target.value) } minLength={ 8 } required />
            </div>
            <div className="mt-6">
                <Button type="submit" className="flex gap-2.5 w-full items-center" disabled={ loading }>
                    { loading ? <Loader2 className="animate-spin inline-block" size={ 18 } /> : '' }
                    Login
                </Button>
            </div>
            <div className="mt-5 text-sm text-center">
                Don't have an account? <Link href="/register" className="font-semibold hover:underline">Register</Link>
            </div>
        </form>
    )
}