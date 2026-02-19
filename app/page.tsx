"use client"

import {
  fetchVideos,
  selectError,
  selectIsFromMock,
  selectIsLoading,
  selectVideos
} from "@/features/video-search"
import { SearchFilter } from "@/features/video-search/ui/search-filter"
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks"
import SectionWrapper from "@/widgets/section-wrapper"
import { VideoCatalog } from "@/widgets/video-catalog"
import { useEffect } from "react"

export default function Home() {
  const dispatch = useAppDispatch()
  const videos = useAppSelector(selectVideos)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)
  const isFromMock = useAppSelector(selectIsFromMock)

  useEffect(() => {
    dispatch(fetchVideos(12))
  }, [dispatch])

  return (
    <main className="flex min-h-screen items-center justify-center font-sans bg-black px-10 py-40">
      <SectionWrapper className="flex flex-col gap-6">
        <SearchFilter />
        <VideoCatalog
          videos={videos}
          isLoading={isLoading}
          error={error}
          isFromMock={isFromMock}
        />
      </SectionWrapper>
    </main>
  )
}
