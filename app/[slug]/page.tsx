import { fetchSingle } from "@/api/single"

import {
  concatenateMediaAndCategories,
  getCategories,
  getMedia,
  getPosts,
} from "@/lib/fetchPosts"
import BlocksRender from "@/components/blocksRender"

export default async function Single({ params }: { params: { slug: string } }) {
  // Get API response
  const response = await fetchSingle()
  const body = JSON.parse(
    JSON.stringify(response.body).replace("{post_slug}", params.slug)
  )

  // Fetch post using the extracted params
  const singlePost = await getPosts({ slug: params.slug })

  // Fetch media and categories for the post
  const [media, categories] = await Promise.all([
    getMedia(singlePost),
    getCategories(singlePost),
  ])

  // Concatenate media and categories for the post
  const singlePostData = concatenateMediaAndCategories(
    singlePost,
    media,
    categories
  )

  // Pass the post to the BlocksRender component
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
