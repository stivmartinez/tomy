/* eslint-disable @next/next/no-img-element */
import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"

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

function truncateWithEllipsis(content: any, limit: any) {
  var words = content
    .replace(/<[^>]*>/g, "")
    ?.replace(/&hellip;/g, "")
    ?.replace(/\[|\]/g, "")
    ?.split(" ")
  if (words.length > limit) {
    words = words.slice(0, limit)
    content = words.join(" ") + "..."
  }
  return content
}

interface TypePost {
  id: number // Assuming the posts have a unique id property
  excerpt: any
  slug: string
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
  variants: {
    category: string
    description: string
    type: "list" | "grid"
    image: "on" | "off"
    caption: "on" | "off"
    overlay: boolean
    inverse: boolean
    imageHeight?: string
  }
}

const BlockPosts = ({ posts, variants }: BlockPostsProps) => {
  return (
    <>
      {posts.map((post, index) => (
        <article
          key={index}
          className={cn("relative w-full items-center", {
            "flex flex-row gap-6":
              variants.type === "list" && !variants.inverse,
            "flex flex-row-reverse gap-6":
              variants.type === "list" && variants.inverse,
            "flex flex-col gap-3":
              variants.type !== "list" && !variants.inverse,
            "flex flex-col-reverse gap-3":
              variants.type !== "list" && variants.inverse,
          })}
        >
          {variants.image === "off" ? null : (
            <a
              href={`${post?.slug}` || "/"}
              className={cn("mt-1 flex flex-col gap-1", {
                "w-4/12": variants.type === "list",
                "w-full": variants.type !== "list",
              })}
            >
              <div
                className={cn(
                  "relative w-full gap-6",
                  variants.imageHeight ? `h-[${variants.imageHeight}]` : "",
                  {
                    "h-full": variants.type === "list" && !variants.imageHeight,
                    "h-[200px]":
                      variants.type !== "list" && !variants.imageHeight,
                  }
                )}
              >
                <img
                  className="h-full w-full rounded-lg object-cover"
                  src={
                    post.media?.source_url || "https://via.placeholder.com/300"
                  }
                  alt="A photo of a person"
                />
              </div>
            </a>
          )}
          {variants.caption === "off" ? null : (
            <div
              className={cn(
                "flex flex-col gap-1",
                { "absolute bottom-0 left-0 w-full p-8": variants.overlay },
                { "w-8/12": variants.type === "list" && !variants.overlay },
                { "w-full": variants.type !== "list" && !variants.overlay }
              )}
            >
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
              {variants.category !== "off" && (
                <a
                  href={`${post?.slug}` || "/"}
                  className="text-xs font-bold text-blue-600"
                >
                  {post.category?.name}
                </a>
              )}
              <a href={`${post?.slug}` || "/"}>
                <h2
                  className={cn(
                    "text-lg font-bold leading-snug tracking-tight hover:underline"
                  )}
                >
                  {post.title.rendered}
                </h2>
                {variants.description !== "off" && (
                  <p className="mt-2 text-sm text-gray-400">
                    {truncateWithEllipsis(post.excerpt.rendered, 25)}
                  </p>
                )}
              </a>
            </div>
          )}
        </article>
      ))}
    </>
  )
}

export default BlockPosts
