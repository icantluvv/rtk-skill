import Image from "next/image"
import Link from "next/link"

export type VideoCardProps = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
}

export function VideoCard({
  imageSrc = "",
  imageAlt = "",
  title,
  description
}: VideoCardProps) {
  return (
    <Link href={`/${title}`} className="flex flex-col overflow-hidden ">
      <div className="relative w-full aspect-video overflow-hidden bg-background/10 rounded-xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-xl transition-all duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-3 text-xl font-medium text-red-600">{title}</h3>
      <p className="mt-1 text-sm text-white line-clamp-2 pr-1">{description}</p>
    </Link>
  )
}
