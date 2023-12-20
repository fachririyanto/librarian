import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="flex gap-3 items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin" />
                Loading...
            </div>
        </div>
    )
}