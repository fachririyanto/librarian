export type API_Response<T> = {
    status?: number
    message?: string
    data: T

    // For pagination
    total?: number
}