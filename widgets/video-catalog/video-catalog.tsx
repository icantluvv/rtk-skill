import { VideoCard, VideoCardProps } from "@/entities/video-card"
import { useCallback, useRef } from "react"

type VideoCatalogProps = {
  videos: VideoCardProps[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  isFromMock: boolean
  hasNext: boolean
  onLoadMore: () => void
}

const LOAD_MORE_THRESHOLD = 3

export const VideoCatalog = ({
  videos,
  isLoading,
  isLoadingMore,
  error,
  isFromMock,
  hasNext,
  onLoadMore
}: VideoCatalogProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect()
      if (!node || !hasNext || isLoadingMore) return

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      })
      observerRef.current.observe(node)
    },
    [hasNext, isLoadingMore, onLoadMore]
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen">
        <p className="text-white text-lg">Загрузка видео...</p>
      </div>
    )
  }

  if (error && !isFromMock) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500 text-lg">Ошибка: {error}</p>
      </div>
    )
  }

  const sentinelIndex = videos.length - LOAD_MORE_THRESHOLD

  return (
    <div className="flex flex-col gap-6 w-full">
      {isFromMock && (
        <div className=" p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-500 text-sm">
            ⚠️ Видео загружены из mock данных (проблема с API)
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 gap-y-10">
        {videos.map((video, index) => (
          <div
            key={`${video.title}-${index}`}
            ref={index === sentinelIndex ? sentinelRef : undefined}
          >
            <VideoCard {...video} />
          </div>
        ))}
      </div>
      {isLoadingMore && (
        <div className="flex items-center justify-center py-6">
          <p className="text-white text-lg">Загрузка...</p>
        </div>
      )}
    </div>
  )
}
