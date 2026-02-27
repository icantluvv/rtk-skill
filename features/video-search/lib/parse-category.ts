import type { Category } from "../api/types"

const VALID_CATEGORIES: Category[] = [
  "tags/video/7487",
  "feeds/cardgroup/1554",
  "feeds/cardgroup/1557"
]

export function parseCategory(value: string | undefined): Category | undefined {
  if (!value) return undefined
  return VALID_CATEGORIES.includes(value as Category)
    ? (value as Category)
    : undefined
}
