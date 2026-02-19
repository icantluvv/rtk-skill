"use client"

import { useParams } from "next/navigation"

export default function VideoPage() {
  const params = useParams()
  const id = params?.id as string

  if (!id) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-10">
      <div className="w-full max-w-4xl">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-900">
          <iframe
            width="100%"
            height="100%"
            src={`https://rutube.ru/play/embed/${id}`}
            frameBorder="0"
            allow="clipboard-write; autoplay"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Видео с Rutube
          </h1>
          <p className="text-gray-400">ID: {id}</p>
        </div>
      </div>
    </main>
  )
}
