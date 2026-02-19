import { VideoCardProps } from "@/entities/video-card"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchVideosFromApi } from "../api/fetch-videos"
import { MOCK_VIDEOS } from "../api/mock"
import { VideoSearchParams } from "../api/types"

// TYPES
export type Video = VideoCardProps

export type VideoSearchState = {
  videos: Video[]
  isLoading: boolean
  error: string | null
  isFromMock: boolean
  currentPage: number
  hasNext: boolean
}

// INITIAL STATE
const initialState: VideoSearchState = {
  videos: [],
  isLoading: false,
  error: null,
  isFromMock: false,
  currentPage: 1,
  hasNext: false
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
        hasNext: result.hasNext,
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
        hasNext,
        currentPage: page
      }
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
      state.hasNext = false
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
        state.hasNext = action.payload.hasNext
        state.currentPage = action.payload.currentPage
        state.error = null
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false
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
export const selectError = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.error
export const selectIsFromMock = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.isFromMock
export const selectVideosCount = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.videos.length
export const selectCurrentPage = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.currentPage
export const selectHasNext = (state: { videoSearch: VideoSearchState }) =>
  state.videoSearch.hasNext

// DEFAULT EXPORT REDUCER
export default videoSearchSlice.reducer
