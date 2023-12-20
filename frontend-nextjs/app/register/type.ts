export interface IFormRegister {
    name: string
    email: string
    password: string
    repassword: string
}

export const initialState: IFormRegister = {
    name: '',
    email: '',
    password: '',
    repassword: ''
}