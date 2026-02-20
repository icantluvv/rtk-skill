"use client"

import {
  fetchVideos,
  fetchMoreVideos,
  selectError,
  selectIsFromMock,
  selectIsLoading,
  selectIsLoadingMore,
  selectVideos,
  selectHasNext
} from "@/features/video-search"
import { SearchFilter } from "@/features/video-search/ui/search-filter"
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks"
import SectionWrapper from "@/widgets/section-wrapper"
import { VideoCatalog } from "@/widgets/video-catalog"
import { useCallback, useEffect } from "react"

export default function Home() {
  const dispatch = useAppDispatch()
  const videos = useAppSelector(selectVideos)
  const isLoading = useAppSelector(selectIsLoading)
  const isLoadingMore = useAppSelector(selectIsLoadingMore)
  const error = useAppSelector(selectError)
  const isFromMock = useAppSelector(selectIsFromMock)
  const hasNext = useAppSelector(selectHasNext)

  useEffect(() => {
    dispatch(fetchVideos({ limit: 12 }))
  }, [dispatch])

  const handleLoadMore = useCallback(() => {
    dispatch(fetchMoreVideos())
  }, [dispatch])

  return (
    <main className="flex min-h-screen items-center justify-center font-sans bg-black px-10 py-40">
      <SectionWrapper className="flex flex-col gap-6">
        <SearchFilter />
        <VideoCatalog
          videos={videos}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          isFromMock={isFromMock}
          hasNext={hasNext}
          onLoadMore={handleLoadMore}
        />
      </SectionWrapper>
    </main>
  )
}
