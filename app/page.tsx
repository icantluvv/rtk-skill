import { VideoCatalog } from "@/entities/video-catalog"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center  font-sans bg-black p-10">
      <VideoCatalog />
    </main>
  )
}
