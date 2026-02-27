import { useVideoSearch, type Category } from "@/features/video-search"
import { memo, type SubmitEvent } from "react"

function SearchFilterComponent() {
  const { category, changeCategory } = useVideoSearch()

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const selected = formData.get("category") as Category
    changeCategory(selected)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full gap-4 items-center justify-end"
    >
      <select
        name="category"
        value={category}
        onChange={(e) => changeCategory(e.target.value as Category)}
        className="px-4 py-2 border rounded-lg min-w-70 bg-gray-200 min-h-12"
      >
        <option value="feeds/cardgroup/1554">Сериалы</option>
        <option value="feeds/cardgroup/1557">Детям</option>
        <option value="tags/video/7487">Кино</option>
      </select>

      <button
        type="submit"
        className="flex min-w-40 items-center justify-center gap-3 px-6 min-h-12 py-2 duration-100 cursor-pointer bg-red-700  active:bg-red-800 text-white rounded-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Искать
      </button>
    </form>
  )
}

export const SearchFilter = memo(SearchFilterComponent)
