import {
    getStorageURL,
    fetchAPI,
    fetchPrivateAPI,
} from './utils'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL
const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY

export {
    // constants
    API_BASE_URL,
    API_ENDPOINT_URL,
    API_SECRET_KEY,

    // functions
    getStorageURL,
    fetchAPI,
    fetchPrivateAPI,
}