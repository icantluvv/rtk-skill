import Image from "next/image"
import Link from "next/link"

export type VideoCardProps = {
  id: string
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  age?: string
  videoCount?: number
}

export function VideoCard({
  id,
  imageSrc = "",
  imageAlt = "",
  title,
  description,
  age,
  videoCount
}: VideoCardProps) {
  return (
    <Link
      href={`/video/${id}`}
      className="flex flex-col overflow-hidden group cursor-pointer"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-background/10 rounded-xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          quality={100}
          className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {age && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
            {age}
          </div>
        )}
      </div>
      <h3 className="mt-3 text-xl font-medium text-white hover:text-red-600 line-clamp-2 group-hover:text-red-500 transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        {videoCount !== undefined && (
          <span className="text-sm text-gray-400">{videoCount} видео</span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-400 line-clamp-2 pr-1">
        {description}
      </p>
    </Link>
  )
}
