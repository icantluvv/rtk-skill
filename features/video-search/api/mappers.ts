import { RutubeVideoResponse, Video } from "./types"

export const mapRutubeVideoToVideo = (
  rutubeVideo: RutubeVideoResponse
): Video => {
  const { object } = rutubeVideo
  return {
    id: String(object.id),
    imageSrc: object.picture || "/placeholder-video.jpg",
    imageAlt: object.name,
    title: object.name,
    description: object.description || "Без описания",
    age: object.age,
    videoCount: object.video_count
  }
}

export const mapRutubeVideosToVideos = (
  rutubeVideos: RutubeVideoResponse[]
): Video[] => {
  return rutubeVideos.map(mapRutubeVideoToVideo)
}
