declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_APP_NAME: string,

        NEXT_PUBLIC_API_ENDPOINT: string,
        NEXT_PUBLIC_API_KEY: string,
    }
}

module.exports = {}