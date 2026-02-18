import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"

export type VideoCardProps = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
}

export const VideoCard: FC<VideoCardProps> = ({
  imageSrc = "",
  imageAlt = "",
  title,
  description
}) => {
  return (
    <Link href={`/${title}`} className="flex flex-col overflow-hidden hover">
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-background/10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-3 text-2xl font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-base text-foreground/80 line-clamp-2">
        {description}
      </p>
    </Link>
  )
}
