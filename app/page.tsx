import React from "react"

import PagesRender from "@/components/pagesRender"

const website = "https://mejorconsalud.as.com"

interface Post {
  id: number
  slug: string
  title: {
    rendered: string
  }
  featured_media: number
  categories: number[]
  media: Media
  category: Category
}

interface Media {
  id: number
  source_url: string
}

interface Category {
  id: number
  name: string
}

const fetchApi = async (endpoint: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params)
  const res = await fetch(`${website}${endpoint}?${searchParams}`)
  return res.json()
}

async function getPosts(params: Record<string, string> = {}): Promise<Post[]> {
  return fetchApi("/wp-json/wp/v2/posts", params)
}

async function getMedia(posts: Post[]): Promise<Media[]> {
  const mediaIds = posts.map((post) => post.featured_media)
  return fetchApi("/wp-json/wp/v2/media", { include: mediaIds.join(",") })
}

async function getCategories(posts: Post[]): Promise<Category[]> {
  const categoryIds = posts.flatMap((post) => post.categories)
  return fetchApi("/wp-json/wp/v2/categories", {
    include: categoryIds.join(","),
  })
}

function concatenateMediaAndCategories(
  postList: Post[],
  media: Media[],
  categories: Category[]
): Post[] {
  return postList.map((post) => {
    const mediaItem = media.find((item) => item.id === post.featured_media)
    const categoryItem = categories.find(
      (item) => item.id === post.categories[0]
    )

    // Provide default values for media and category properties
    const defaultMedia: Media = {
      id: -1,
      source_url: "",
    }

    const defaultCategory: Category = {
      id: -1,
      name: "",
    }

    return {
      ...post,
      media: mediaItem || defaultMedia,
      category: categoryItem || defaultCategory,
    }
  })
}

function generatePostParams({
  page = 1,
  perPage = 9,
  featured,
  sticky,
}: {
  page?: number
  perPage?: number
  featured?: boolean
  sticky?: boolean
}): Record<string, string> {
  const params: Record<string, string> = {
    page: String(page),
    per_page: String(perPage),
  }

  if (featured) {
    params["filter[meta_key]"] = "featured"
    params["filter[meta_value]"] = "1"
  }

  if (sticky) {
    params["sticky"] = "true"
  }

  return params
}

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
