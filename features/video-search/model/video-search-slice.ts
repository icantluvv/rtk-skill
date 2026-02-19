import { VideoCardProps } from "@/entities/video-card"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchVideosFromApi } from "../api/fetch-videos"
import { MOCK_VIDEOS } from "../api/mock"

// TYPES
export type Video = VideoCardProps

export type VideoSearchState = {
  videos: Video[]
  isLoading: boolean
  error: string | null
  isFromMock: boolean
}

// INITIAL STATE
const initialState: VideoSearchState = {
  videos: [],
  isLoading: false,
  error: null,
  isFromMock: false
}

// ASYNC THUNKS
export const fetchVideos = createAsyncThunk(
  "videoSearch/fetchVideos",
  async (limit: number = 12) => {
    try {
      const videos = await fetchVideosFromApi(limit)
      return { videos, isFromMock: false }
    } catch (error) {
      console.warn(
        "Ошибка при загрузке видео с API, используем mock данные:",
        error
      )
      return { videos: MOCK_VIDEOS.slice(0, limit), isFromMock: true }
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

// DEFAULT EXPORT REDUCER
export default videoSearchSlice.reducer
