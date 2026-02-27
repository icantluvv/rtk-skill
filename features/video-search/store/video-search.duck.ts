import { isServer } from "@/shared/lib/is-server"
import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { mapRutubeVideosToVideos } from "../api/mappers"
import { MOCK_VIDEOS } from "../api/mock"
import type {
  GetVideosArgs,
  GetVideosResult,
  RutubeSearchResponse,
  Video
} from "../api/types"

type VideoSearchPreloadedState = {
  [videoSearchApi.reducerPath]: ReturnType<typeof videoSearchApi.reducer>
}

const RUTUBE_API_BASE = "https://rutube.ru/api/"
const RUTUBE_PROXY_PATH = process.env.RUTUBE_BFF_PATH

export const videoSearchApi = createApi({
  reducerPath: "videoSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: isServer() ? RUTUBE_API_BASE : RUTUBE_PROXY_PATH
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
    }),
    getVideoById: build.query<Video, string>({
      query: (id) => ({ url: `/videos/${id}` })
    })
  })
})

export const { useGetVideosQuery, useGetVideoByIdQuery } = videoSearchApi

const reducer = { [videoSearchApi.reducerPath]: videoSearchApi.reducer }

export const makeVideoSearchStore = (
  preloadedState?: VideoSearchPreloadedState
) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(videoSearchApi.middleware),
    devTools: process.env.NODE_ENV !== "production"
  })

export type VideoSearchStore = ReturnType<typeof makeVideoSearchStore>
export type VideoSearchState = ReturnType<VideoSearchStore["getState"]>
export type VideoSearchDispatch = VideoSearchStore["dispatch"]
