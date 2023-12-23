import Image from 'next/image'

interface ImageCoverProps {
    w: number
    h: number
    src: string
    alt?: string
    className?: string
    fill?: boolean
    priority?: boolean
}

export function ImageCover({ alt, w, h, src, className, ...rest }: ImageCoverProps) {
    const ratio = h / w * 100

    return (
        <figure className={ `relative overflow-hidden ${className}` } style={{
            paddingTop: `${ratio}%`,
        }}>
            <picture className="flex absolute inset-0">
                <Image
                    alt={ alt || '' }
                    src={ src }
                    sizes="100%"
                    { ...rest }
                    className="object-cover"
                />
            </picture>
        </figure>
    )
}