import { VideoCardProps } from "@/entities/video-card"

export type Video = VideoCardProps

export type RutubeContentObject = {
  id: number
  name: string
  description: string
  picture: string
  video_count?: number
  age?: string
  duration?: number
  type?: {
    id: number
    name: string
    title: string
  }
}

export type RutubeVideoResponse = {
  id: number
  content_type: {
    id: number
    app_label: string
    model: string
  }
  object_id: number
  object: RutubeContentObject
  is_adult: boolean
  last_updated_ts: string
}

export type RutubeSearchResponse = {
  has_next: boolean
  next: string | null
  previous: string | null
  page: number
  per_page: number
  results: RutubeVideoResponse[]
}

export type GetVideosArgs = {
  category: string
  page?: number
  limit?: number
}

export type GetVideosResult = {
  videos: Video[]
  next: string | null
  page: number
  isFromMock: boolean
}
