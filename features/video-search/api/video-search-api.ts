import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { mapRutubeVideosToVideos } from "./mappers"
import { MOCK_VIDEOS } from "./mock"
import {
  GetVideosArgs,
  GetVideosResult,
  RutubeSearchResponse
} from "./types"

export const videoSearchApi = createApi({
  reducerPath: "videoSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.RUTUBE_BFF_PATH
  }),
  endpoints: (build) => ({
    getVideos: build.query<GetVideosResult, GetVideosArgs>({
      queryFn: async (args, _queryApi, _extraOptions, baseQuery) => {
        const { category, page = 1, limit = 12 } = args

        const result = await baseQuery({
          url: category,
          params: {
            limit,
            page,
            noTitle: true,
            posters: true,
            show_hidden_videos: false
          }
        })

        if (result.error) {
          console.error("API error, falling back to mock data:", result.error)

          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit
          const videos = MOCK_VIDEOS.slice(startIndex, endIndex)
          const hasNext = endIndex < MOCK_VIDEOS.length

          return {
            data: {
              videos,
              next: hasNext ? "mock" : null,
              page,
              isFromMock: true
            }
          }
        }

        const response = result.data as RutubeSearchResponse

        return {
          data: {
            videos: mapRutubeVideosToVideos(response.results),
            next: response.next,
            page: response.page,
            isFromMock: false
          }
        }
      },
      serializeQueryArgs: ({ queryArgs }) => queryArgs.category,
      merge: (currentCache, newData) => {
        if (newData.page === 1) return newData

        currentCache.videos.push(...newData.videos)
        currentCache.next = newData.next
        currentCache.page = newData.page
        currentCache.isFromMock = newData.isFromMock
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page
    })
  })
})

export const { useGetVideosQuery } = videoSearchApi
