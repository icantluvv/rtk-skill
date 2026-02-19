import { MOCK_VIDEOS } from "@/features/video-search/api/mock"
import { VideoCard } from "../../entities/video-card"

export const VideoCatalog = () => {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-15">
      {MOCK_VIDEOS.map((video) => (
        <VideoCard
          key={video.title}
          imageSrc={video.imageSrc}
          imageAlt={video.imageAlt}
          title={video.title}
          description={video.description}
        />
      ))}
    </div>
  )
}
