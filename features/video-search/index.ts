export { default as videoSearchReducer } from "./model/video-search-slice"
export {
  fetchVideos,
  resetVideos,
  clearError,
  selectVideos,
  selectIsLoading,
  selectError,
  selectIsFromMock,
  selectVideosCount
} from "./model/video-search-slice"
export type { VideoSearchState, Video } from "./model/video-search-slice"
