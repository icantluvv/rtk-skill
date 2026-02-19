import { VideoCard, VideoCardProps } from "@/entities/video-card"

type VideoCatalogProps = {
  videos: VideoCardProps[]
  isLoading: boolean
  error: string | null
  isFromMock: boolean
}

export const VideoCatalog = ({
  videos,
  isLoading,
  error,
  isFromMock
}: VideoCatalogProps) => {
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

  return (
    <div className="flex flex-col gap-6 w-full">
      {isFromMock && (
        <div className=" p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-500 text-sm">
            ⚠️ Видео загружены из mock данных (проблема с API)
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 gap-y-6">
        {videos.map((video, index) => (
          <VideoCard
            key={`${video.title}-${index}`}
            imageSrc={video.imageSrc}
            imageAlt={video.imageAlt}
            title={video.title}
            description={video.description}
          />
        ))}
      </div>
    </div>
  )
}
