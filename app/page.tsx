import React from "react"
import { fetchApiResponse } from "@/api/mockApi"

import {
  concatenateMediaAndCategories,
  generatePostParams,
  getCategories,
  getMedia,
  getPosts,
} from "@/lib/fetchPosts"
import PagesRender from "@/components/pagesRender"

export default async function Home() {
  // Fetch regular posts
  const regularPostsParams = generatePostParams({ perPage: 9 })
  const regularPosts = await getPosts(regularPostsParams)

  // Fetch featured posts
  const featuredPostsParams = generatePostParams({ perPage: 3, featured: true })
  const featuredPosts = await getPosts(featuredPostsParams)

  // Fetch media and categories for all the post types
  const allPosts = [...regularPosts, ...featuredPosts]
  const [media, categories] = await Promise.all([
    getMedia(allPosts),
    getCategories(allPosts),
  ])

  // Concatenate media and categories for each post type
  const regularPostsWithMediaAndCategories = concatenateMediaAndCategories(
    regularPosts,
    media,
    categories
  )

  const featuredPostsWithMediaAndCategories = concatenateMediaAndCategories(
    featuredPosts,
    media,
    categories
  )

  // Get API response
  const template = await fetchApiResponse()

  // Pass the posts to the PagesRender component
  return (
    <PagesRender
      template={template}
      regularPosts={regularPostsWithMediaAndCategories}
      featuredPosts={featuredPostsWithMediaAndCategories}
    />
  )
}
