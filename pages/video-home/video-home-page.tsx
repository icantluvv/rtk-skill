"use client"

import { useGetVideosQuery, useVideoSearch } from "@/features/video-search"
import { SearchFilter } from "@/features/video-search/ui/search-filter"
import { VideoCatalog } from "@/widgets/video-catalog"

export function VideoHomePage() {
  const { category, page } = useVideoSearch()

  const { data, isLoading, isFetching, error } = useGetVideosQuery({
    category,
    page
  })

  return (
    <>
      <SearchFilter />
      <VideoCatalog
        videos={data?.videos ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error ? "Произошла ошибка при загрузке видео" : null}
        isFromMock={data?.isFromMock ?? false}
        hasNext={!!data?.next}
      />
    </>
  )
}
