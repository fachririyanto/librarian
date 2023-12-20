import { TypeMember } from '../models/member'

export type API_Response<T> = {
    status?: number
    code?: number
    message?: string
    data: T

    // For pagination
    total?: number
}

export type RegisterResponse = {
    email: string
}

export type LoginResponse = {
    token: string
    refresh_token: string
    duration: number
}

export type ProfileResponse = {
    member: TypeMember
}