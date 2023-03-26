import React from "react"
import { fetchSingle } from "@/api/single"

import {
  concatenateMediaAndCategories,
  generatePostParams,
  getCategories,
  getMedia,
  getPosts,
} from "@/lib/fetchPosts"
import BlocksRender from "@/components/blocksRender"

export default async function Single({ params }: { params: { slug: string } }) {
  // Fetch post
  const singlePostParams = generatePostParams({ slug: params.slug })
  const singlePost = await getPosts(singlePostParams)

  // Fetch media and categories for all the post types
  const allPosts = [...singlePost]
  const [media, categories] = await Promise.all([
    getMedia(allPosts),
    getCategories(allPosts),
  ])

  // Concatenate media and categories for each post type
  const singlePostData = concatenateMediaAndCategories(
    singlePost,
    media,
    categories
  )

  // Get API response
  const body = (await fetchSingle()).body

  // Pass the posts to the BlocksRender component
  return (
    <BlocksRender
      template={body}
      data={{
        wordpress: {
          posts: {
            single: singlePostData,
          },
        },
      }}
    />
  )
}
