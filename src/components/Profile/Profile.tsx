import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="https://placehold.co/500x500"
      alt="Placeholder image"
      width={500}
      height={500}
    />
  )
}
