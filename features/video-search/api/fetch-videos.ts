import { rutubeInstance } from "@/shared/api/rutube-instance"
import { Video } from "../model/video-search-slice"
import { mapRutubeVideosToVideos } from "./mappers"
import { RutubeSearchResponse, VideoSearchParams } from "./types"

const RUTUBE_API_BASE = "https://rutube.ru/api/"

type FetchVideosResult = {
  videos: Video[]
  next: string | null
  currentPage: number
}

export const fetchVideosFromApi = async (
  params: VideoSearchParams
): Promise<FetchVideosResult> => {
  const {
    category = "feeds/cardgroup/1554",
    limit = 12,
    page = 1,
    noTitle = true,
    posters = true,
    show_hidden_videos = false
  } = params

  const response = await rutubeInstance.get<RutubeSearchResponse>(category, {
    params: {
      limit,
      page,
      noTitle,
      posters,
      show_hidden_videos
    }
  })

  return {
    videos: mapRutubeVideosToVideos(response.data.results),
    next: response.data.next,
    currentPage: response.data.page
  }
}

export const fetchVideosFromNextUrl = async (
  nextUrl: string
): Promise<FetchVideosResult> => {
  const proxyPath = nextUrl.replace(RUTUBE_API_BASE, "")
  const response = await rutubeInstance.get<RutubeSearchResponse>(proxyPath)

  return {
    videos: mapRutubeVideosToVideos(response.data.results),
    next: response.data.next,
    currentPage: response.data.page
  }
}
