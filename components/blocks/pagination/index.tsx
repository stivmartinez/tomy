"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function BlockPagination() {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const isMutating = isFetching

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  function handleLoadMore() {
    setIsFetching(true)

    // Increment the page number
    const nextPage = page + 1

    // Update the URL with the new page number
    const newUrl =
      pathname + "?" + createQueryString("page", nextPage.toString())
    router.push(newUrl)

    setIsFetching(false)
    setPage(nextPage)
  }

  return (
    <div>
      <button onClick={handleLoadMore} disabled={isFetching}>
        {isMutating ? "Loading..." : "Load More"}
      </button>
    </div>
  )
}
