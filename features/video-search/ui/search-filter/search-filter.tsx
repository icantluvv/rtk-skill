"use client"

import { useState } from "react"

type Region = "russia" | "kazakhstan" | "belarus"

type SearchFilterProps = {
  onSearch?: (region: Region) => void
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region>("russia")

  const handleSearch = () => {
    onSearch?.(selectedRegion)
  }

  return (
    <div className="flex w-full gap-4 items-center justify-end">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value as Region)}
        className="px-4 py-2 border rounded-lg min-w-70 bg-gray-200 min-h-12"
      >
        <option value="russia">Россия</option>
        <option value="kazakhstan">Казахстан</option>
        <option value="belarus">Беларусь</option>
      </select>

      <button
        onClick={handleSearch}
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
    </div>
  )
}
