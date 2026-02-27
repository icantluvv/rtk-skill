"use client"

import { createContext, useContext, useState } from "react"
import { Provider } from "react-redux"
import { Category } from "../api/types"
import { makeVideoSearchStore } from "./video-search.duck"
import type { VideoSearchState } from "./video-search.duck"

type VideoSearchStoreProviderProps = {
  children: React.ReactNode
  preloadedState?: VideoSearchState
  initialCategory?: Category
  initialPage?: number
}

type VideoSearchContextValue = {
  category: Category
  page: number
  changeCategory: (category: Category) => void
  loadNextPage: () => void
}

const DEFAULT_CATEGORY: Category = "feeds/cardgroup/1554"
const DEFAULT_PAGE = 1
const VideoSearchContext = createContext<VideoSearchContextValue | null>(null)

export function VideoSearchStoreProvider({
  children,
  preloadedState,
  initialCategory = DEFAULT_CATEGORY,
  initialPage = DEFAULT_PAGE
}: VideoSearchStoreProviderProps) {
  const [store] = useState(() => makeVideoSearchStore(preloadedState))

  const [category, setCategory] = useState<Category>(initialCategory)
  const [page, setPage] = useState(initialPage)

  function changeCategory(newCategory: Category) {
    setCategory(newCategory)
    setPage(1)
  }

  function loadNextPage() {
    setPage((p) => p + 1)
  }

  const value: VideoSearchContextValue = {
    category,
    page,
    changeCategory,
    loadNextPage
  }

  return (
    <Provider store={store}>
      <VideoSearchContext.Provider value={value}>
        {children}
      </VideoSearchContext.Provider>
    </Provider>
  )
}

export function useVideoSearch() {
  const context = useContext(VideoSearchContext)
  if (!context) {
    throw new Error(
      "useVideoSearch must be used within VideoSearchStoreProvider"
    )
  }
  return context
}
