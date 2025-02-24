import NextImage from 'next/image'

export interface ImageProps {
  src: string
  alt: string
  width?: number // default is 500px
  height?: number // default is 500px
  overrideSrc?: string
}

export default function Image({
  src,
  alt,
  width,
  height,
  overrideSrc,
}: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      overrideSrc={overrideSrc}
    />
  )
}
