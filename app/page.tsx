"use client"

import { useGetVideosQuery } from "@/features/video-search"
import { SearchFilter } from "@/features/video-search/ui/search-filter"
import SectionWrapper from "@/widgets/section-wrapper"
import { VideoCatalog } from "@/widgets/video-catalog"
import { useCallback, useState } from "react"

const DEFAULT_CATEGORY = "feeds/cardgroup/1554"
const PAGE_LIMIT = 12

export default function Home() {
  const [category, setCategory] = useState(DEFAULT_CATEGORY)
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = useGetVideosQuery({
    category,
    page,
    limit: PAGE_LIMIT
  })

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory)
    setPage(1)
  }, [])

  const handleLoadMore = useCallback(() => {
    if (data?.next) {
      setPage((prev) => prev + 1)
    }
  }, [data?.next])

  return (
    <main className="flex min-h-screen items-center justify-center font-sans bg-black px-10 py-40">
      <SectionWrapper className="flex flex-col gap-6">
        <SearchFilter onSearch={handleCategoryChange} />
        <VideoCatalog
          videos={data?.videos ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error ? "Произошла ошибка при загрузке видео" : null}
          isFromMock={data?.isFromMock ?? false}
          hasNext={!!data?.next}
          onLoadMore={handleLoadMore}
        />
      </SectionWrapper>
    </main>
  )
}
