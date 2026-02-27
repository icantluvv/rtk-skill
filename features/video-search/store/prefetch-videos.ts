import type { Category } from "../api/types"
import { parseCategory } from "../lib/parse-category"
import {
  makeVideoSearchStore,
  videoSearchApi
} from "./video-search.duck"
import type { VideoSearchState } from "./video-search.duck"

const DEFAULT_CATEGORY: Category = "feeds/cardgroup/1554"
const DEFAULT_PAGE = 1

export type PrefetchVideosResult = {
  preloadedState: VideoSearchState
  category: Category
  page: number
}

export async function prefetchVideos(
  category?: string,
  page?: number
): Promise<PrefetchVideosResult> {
  const resolvedCategory = parseCategory(category) ?? DEFAULT_CATEGORY
  const resolvedPage = page ?? DEFAULT_PAGE

  const store = makeVideoSearchStore()

  await store.dispatch(
    videoSearchApi.endpoints.getVideos.initiate({
      category: resolvedCategory,
      page: resolvedPage
    })
  )

  return {
    preloadedState: store.getState(),
    category: resolvedCategory,
    page: resolvedPage
  }
}
