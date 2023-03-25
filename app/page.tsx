import React from "react"

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

  // Fetch sticky posts
  const stickyPostsParams = generatePostParams({ perPage: 3, sticky: true })
  const stickyPosts = await getPosts(stickyPostsParams)

  // Fetch media and categories for all the post types
  const allPosts = [...regularPosts, ...featuredPosts, ...stickyPosts]
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

  const stickyPostsWithMediaAndCategories = concatenateMediaAndCategories(
    stickyPosts,
    media,
    categories
  )

  // Pass the posts to the PagesRender component
  return (
    <PagesRender
      regularPosts={regularPostsWithMediaAndCategories}
      featuredPosts={featuredPostsWithMediaAndCategories}
      stickyPosts={stickyPostsWithMediaAndCategories}
    />
  )
}
