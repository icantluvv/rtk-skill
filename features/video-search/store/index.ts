export { prefetchVideos } from "./prefetch-videos"
export type { PrefetchVideosResult } from "./prefetch-videos"
export {
  makeVideoSearchStore,
  videoSearchApi,
  useGetVideosQuery,
  useGetVideoByIdQuery
} from "./video-search.duck"
export type {
  VideoSearchDispatch,
  VideoSearchState,
  VideoSearchStore
} from "./video-search.duck"
export {
  useVideoSearch,
  VideoSearchStoreProvider
} from "./video-search-store-provider"
