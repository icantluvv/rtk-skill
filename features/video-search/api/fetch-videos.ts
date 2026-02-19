import { rutubeInstance } from "@/shared/api/rutube-instance"
import { Video } from "../model/video-search-slice"
import { mapRutubeVideosToVideos } from "./mappers"
import { RutubeSearchResponse, VideoSearchParams } from "./types"

export const fetchVideosFromApi = async (
  params: VideoSearchParams
): Promise<{ videos: Video[]; hasNext: boolean; currentPage: number }> => {
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
    hasNext: response.data.has_next,
    currentPage: response.data.page
  }
}
