declare namespace NodeJS {
    interface ProcessEnv {
        // App Config
        NEXT_PUBLIC_APP_NAME: string,

        // API Config
        NEXT_PUBLIC_API_BASE_URL: string,
        NEXT_PUBLIC_API_ENDPOINT_URL: string,
        NEXT_PUBLIC_API_SECRET_KEY: string,
    }
}

module.exports = {}