import { fetchHome } from "@/api/home"

import { extractPostParams } from "@/lib/extractPostParams"
import {
  concatenateMediaAndCategories,
  getCategories,
  getMedia,
  getPosts,
} from "@/lib/fetchPosts"
import BlocksRender from "@/components/blocksRender"

export default async function Home() {
  // Get API response
  const response = await fetchHome()
  const body = response.body

  // Extract the post params from the body
  const postParams = extractPostParams(body)

  // Fetch posts for each type of post
  const allPostsPromises = Object.entries(postParams).map(
    async ([postType, params]) => {
      const posts = await getPosts(params)
      return { postType, posts }
    }
  )

  const allPostsArray = await Promise.all(allPostsPromises)
  const allPosts = allPostsArray.reduce((acc, { postType, posts }) => {
    acc[postType] = posts
    return acc
  }, {} as Record<string, any[]>)

  // Fetch media and categories for all the post types
  const allPostsCombined = Object.values(allPosts).flat()
  const [media, categories] = await Promise.all([
    getMedia(allPostsCombined),
    getCategories(allPostsCombined),
  ])

  // Concatenate media and categories for each post type
  const allPostsWithMediaAndCategories = Object.fromEntries(
    Object.entries(allPosts).map(([postType, posts]) => [
      postType,
      concatenateMediaAndCategories(posts, media, categories),
    ])
  )

  return (
    <BlocksRender
      template={body}
      data={{
        wordpress: {
          posts: allPostsWithMediaAndCategories,
          // This will include all custom post sorts, e.g.:
          // recent: regularPostsWithMediaAndCategories,
          // featured: featuredPostsWithMediaAndCategories,
          // pinned: pinnedPostsWithMediaAndCategories,
          // sticky: stickyPostsWithMediaAndCategories,
        },
      }}
    />
  )
}
