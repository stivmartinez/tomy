/* eslint-disable @next/next/no-img-element */
import React from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"

/*
How to use this component:

RECENT:
{
  "id": "123456",
  "tag": "div",
  "className": "flex flex-wrap justify-between",
  "componentName": "BlockPosts",
  "props": {
    "posts": "recent"
  }
}

FEATURED EXAMPLE:
{
  "id": "789012",
  "tag": "div",
  "className": "flex flex-wrap justify-between",
  "componentName": "BlockPosts",
  "props": {
    "posts": "featured"
  }
}
*/

interface TypePost {
  slug?: string
  media?: {
    source_url: string
  }
  date: string
  category?: {
    slug: string
    name: string
  }
  title: {
    rendered: string
  }
}

interface BlockPostsProps {
  posts: TypePost[]
}

const BlockPosts: React.FC<BlockPostsProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post, index) => (
        <article key={index} className="w-full">
          <a href={post?.slug || "/"}>
            <div className="relative h-[240px] w-full">
              <img
                className="h-full w-full rounded-xl object-cover"
                src={
                  post.media?.source_url || "https://via.placeholder.com/300"
                }
                alt="A photo of a person"
              />
            </div>
          </a>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2 text-gray-400">
              <Calendar size="14" />
              <p className="my-1 text-xs">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <a
              href={post.category?.slug || "/"}
              className="text-sm text-blue-600"
            >
              {post.category?.name}
            </a>
            <a href={post?.slug || "/"}>
              <h2 className="text-xl font-semibold leading-7 tracking-tight hover:underline">
                {post.title.rendered}
              </h2>
            </a>
          </div>
        </article>
      ))}
    </>
  )
}

export default BlockPosts
