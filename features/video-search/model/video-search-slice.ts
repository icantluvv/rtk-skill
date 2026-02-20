import { VideoCardProps } from "@/entities/video-card"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchVideosFromApi, fetchVideosFromNextUrl } from "../api/fetch-videos"
import { MOCK_VIDEOS } from "../api/mock"
import { VideoSearchParams } from "../api/types"

// TYPES
export type Video = VideoCardProps

export type VideoSearchState = {
  videos: Video[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  isFromMock: boolean
  currentPage: number
  next: string | null
}

// INITIAL STATE
const initialState: VideoSearchState = {
  videos: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  isFromMock: false,
  currentPage: 1,
  next: null
}

// ASYNC THUNKS
export const fetchVideos = createAsyncThunk(
  "videoSearch/fetchVideos",
  async (params: VideoSearchParams = {}) => {
    try {
      const result = await fetchVideosFromApi(params)
      return {
        videos: result.videos,
        isFromMock: false,
        next: result.next,
        currentPage: result.currentPage
      }
    } catch (error) {
      console.error(error)

      const limit = params.limit || 12
      const page = params.page || 1
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const paginatedVideos = MOCK_VIDEOS.slice(startIndex, endIndex)
      const hasNext = endIndex < MOCK_VIDEOS.length

      return {
        videos: paginatedVideos,
        isFromMock: true,
        next: hasNext ? `mock://page=${page + 1}&limit=${limit}` : null,
        currentPage: page
      }
    }
  }
)

export const fetchMoreVideos = createAsyncThunk(
  "videoSearch/fetchMoreVideos",
  async (_, { getState }) => {
    const state = getState() as { videoSearch: VideoSearchState }
    const { next, isFromMock, currentPage } = state.videoSearch

    if (!next) throw new Error("No next page available")

    if (isFromMock) {
      const params = new URLSearchParams(next.replace("mock://", ""))
      const page = Number(params.get("page") || currentPage + 1)
      const limit = Number(params.get("limit") || 12)
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const paginatedVideos = MOCK_VIDEOS.slice(startIndex, endIndex)
      const hasNext = endIndex < MOCK_VIDEOS.length

      return {
        videos: paginatedVideos,
        next: hasNext ? `mock://page=${page + 1}&limit=${limit}` : null,
        currentPage: page
      }
    }

    const result = await fetchVideosFromNextUrl(next)
    return {
      videos: result.videos,
      next: result.next,
      currentPage: result.currentPage
    }
  }
)

// SLICE
const videoSearchSlice = createSlice({
  name: "videoSearch",
  initialState,
  reducers: {
    resetVideos: (state) => {
      state.videos = []
      state.error = null
      state.isFromMock = false
      state.currentPage = 1
      state.next = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false
        state.videos = action.payload.videos
        state.isFromMock = action.payload.isFromMock
        state.next = action.payload.next
        state.currentPage = action.payload.currentPage
        state.error = null
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          action.error.message || "Произошла ошибка при загрузке видео"
      })
      .addCase(fetchMoreVideos.pending, (state) => {
        state.isLoadingMore = true
      })
      .addCase(fetchMoreVideos.fulfilled, (state, action) => {
        state.isLoadingMore = false
        state.videos = [...state.videos, ...action.payload.videos]
        state.next = action.payload.next
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchMoreVideos.rejected, (state, action) => {
        state.isLoadingMore = false
        state.error =
          action.error.message || "Произошла ошибка при загрузке видео"
      })
  }
})

// ACTIONS
export const { resetVideos, clearError } = videoSearchSlice.actions

// SELECTORS
export const selectVideos = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.videos
export const selectIsLoading = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.isLoading
export const selectIsLoadingMore = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.isLoadingMore
export const selectError = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.error
export const selectIsFromMock = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.isFromMock
export const selectVideosCount = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.videos.length
export const selectCurrentPage = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.currentPage
export const selectHasNext = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.next !== null

// DEFAULT EXPORT REDUCER
export default videoSearchSlice.reducer
