import { axiosInstance } from "@/shared/api/axios-instance"
import { Video } from "../model/video-search-slice"

export const fetchVideosFromApi = async (
  limit: number = 12
): Promise<Video[]> => {
  const response = await axiosInstance.get<Video[]>("/videos", {
    params: { limit }
  })
  return response.data
}
