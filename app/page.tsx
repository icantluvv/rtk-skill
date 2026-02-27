import { VideoSearchStoreProvider, prefetchVideos } from "@/features/video-search"
import { VideoHomePage } from "@/pages/video-home"
import SectionWrapper from "@/widgets/section-wrapper"

type HomePageProps = {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = params.page ? Number(params.page) : undefined

  const {
    preloadedState,
    category: initialCategory,
    page: initialPage
  } = await prefetchVideos(params.category, page)

  return (
    <main className="flex min-h-screen items-center justify-center font-sans bg-black px-10 py-40">
      <SectionWrapper className="flex flex-col gap-6">
        <VideoSearchStoreProvider
          key={`${initialCategory}-${initialPage}`}
          preloadedState={preloadedState}
          initialCategory={initialCategory}
          initialPage={initialPage}
        >
          <VideoHomePage />
        </VideoSearchStoreProvider>
      </SectionWrapper>
    </main>
  )
}
