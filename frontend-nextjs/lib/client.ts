export function getAppBaseURL() {
    return process.env.NEXT_PUBLIC_API_BASE
}

export function getStorageURL(path?: string) {
    return getAppBaseURL() + '/storage' + (path ? '/' + path : '')
}