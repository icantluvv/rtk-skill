import { MOCK_VIDEOS } from "@/shared/api/video-catalog"
import { VideoCard } from "../video-card"

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
