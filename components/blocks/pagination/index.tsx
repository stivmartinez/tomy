"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react";

export default function BlockPagination({ variants }) {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const isMutating = isFetching

  const createQueryString = useCallback(
    (name, value) => {
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

  function handlePrevNext(isNext) {
    setIsFetching(true)

    // Increment or decrement the page number
    const newPage = isNext ? page + 1 : page - 1

    // Update the URL with the new page number
    const newUrl =
      pathname + "?" + createQueryString("page", newPage.toString())
    router.push(newUrl)

    setIsFetching(false)
    setPage(newPage)
  }

  return (
    <div>
      {variants === "infinite" ? (
        <button onClick={handleLoadMore} disabled={isFetching}>
          {isMutating ? "Loading..." : "Load More"}
        </button>
      ) : (
        <>
          <button
            onClick={() => handlePrevNext(false)}
            disabled={isFetching || page === 1}
          >
            {isMutating ? "Loading..." : "Prev"}
          </button>
          <button onClick={() => handlePrevNext(true)} disabled={isFetching}>
            {isMutating ? "Loading..." : "Next"}
          </button>
        </>
      )}
    </div>
  )
}
