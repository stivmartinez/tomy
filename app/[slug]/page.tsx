import React from "react"
import { fetchApiResponse } from "@/api/single"

import {
  concatenateMediaAndCategories,
  generatePostParams,
  getCategories,
  getMedia,
  getPosts,
} from "@/lib/fetchPosts"
import PagesRender from "@/components/pagesRender"

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
  const template = await fetchApiResponse()

  // Pass the posts to the PagesRender component
  return (
    <PagesRender
      template={template}
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
